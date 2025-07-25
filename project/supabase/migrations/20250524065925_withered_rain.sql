/*
  # Initial Schema Setup for ParTake Golf Platform

  1. New Tables
    - `profiles`
      - Extended user profile data linked to auth.users
      - Stores handicap, location, and other golf-specific info
    
    - `games`
      - Scheduled golf games/sessions
      - Tracks course, date, time, and participants
    
    - `game_participants`
      - Junction table for users participating in games
      - Handles game invites and confirmations
    
    - `scores`
      - Individual game scores
      - Stores hole-by-hole data and total scores
    
    - `marketplace_listings`
      - Golf equipment and services listings
      - Supports sales, trades, and lesson offerings
    
    - `connections`
      - Golf buddy/friend connections
      - Manages friend requests and relationships

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
    - Secure data access patterns
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  handicap numeric(4,1),
  location text,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name text NOT NULL,
  date date NOT NULL,
  tee_time time NOT NULL,
  max_players int NOT NULL DEFAULT 4,
  notes text,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create game participants table
CREATE TABLE IF NOT EXISTS game_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(game_id, profile_id)
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  hole_scores jsonb NOT NULL, -- Array of scores for each hole
  total_score int NOT NULL,
  total_par int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create marketplace listings table
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  price numeric(10,2),
  category text NOT NULL CHECK (category IN ('clubs', 'balls', 'apparel', 'accessories', 'lessons')),
  condition text CHECK (condition IN ('new', 'like_new', 'good', 'fair')),
  listing_type text NOT NULL CHECK (listing_type IN ('sale', 'trade', 'service')),
  images jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Games policies
CREATE POLICY "Games are viewable by authenticated users"
  ON games FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Game creators can update their games"
  ON games FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Game participants policies
CREATE POLICY "Participants can view game participants"
  ON game_participants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join games"
  ON game_participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their participation status"
  ON game_participants FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id);

-- Scores policies
CREATE POLICY "Scores are viewable by authenticated users"
  ON scores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own scores"
  ON scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own scores"
  ON scores FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id);

-- Marketplace listings policies
CREATE POLICY "Listings are viewable by authenticated users"
  ON marketplace_listings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create listings"
  ON marketplace_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their listings"
  ON marketplace_listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Connections policies
CREATE POLICY "Connections are viewable by participants"
  ON connections FOR SELECT
  TO authenticated
  USING (auth.uid() IN (requester_id, receiver_id));

CREATE POLICY "Users can create connection requests"
  ON connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their connection status"
  ON connections FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (requester_id, receiver_id));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS games_date_idx ON games(date);
CREATE INDEX IF NOT EXISTS marketplace_listings_category_idx ON marketplace_listings(category);
CREATE INDEX IF NOT EXISTS marketplace_listings_status_idx ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS scores_profile_id_idx ON scores(profile_id);
CREATE INDEX IF NOT EXISTS game_participants_game_id_idx ON game_participants(game_id);
CREATE INDEX IF NOT EXISTS connections_requester_id_idx ON connections(requester_id);
CREATE INDEX IF NOT EXISTS connections_receiver_id_idx ON connections(receiver_id);