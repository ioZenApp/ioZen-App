# IoZen MVP Task List

## 🚀 Phase 1: Foundation (Day 1)
**Goal:** Basic infrastructure working

- [x] Next.js project setup
- [x] Project structure & Documentation
- [x] Basic UI components (shadcn/ui)
- [x] **Service Setup**
    - [x] Create Supabase project
    - [x] Get Anthropic API key
    - [x] Configure `.env` file
    - [x] Run database migrations (Prisma)
- [x] Test development server (App is running)

## 🛠 Phase 2: Chatflow Creation (Day 2)
**Goal:** Admin can create chatflows

- [ ] **Chatflow Description UI**
    - [ ] Create `CreateChatflow` component (input for natural language description)
    - [ ] Add "Generate" button with loading state
- [ ] **AI Generation Logic (Vercel Workflow)**
    - [ ] Create Vercel Workflow for chatflow generation
    - [ ] Integrate Anthropic SDK to parse description into JSON schema
    - [ ] Define JSON schema for Chatflow (fields, types, labels)
- [ ] **Chatflow Preview & Edit**
    - [ ] Create `EditFields` component (already partially mocked in `admin-view.tsx`)
    - [ ] Implement state management for editing generated fields
    - [ ] Add "Publish" functionality
- [ ] **Database Integration**
    - [ ] Save chatflow definition to Supabase `chatflows` table
    - [ ] Generate unique public share link

## 💬 Phase 3: Chatflow Filling (Day 3)
**Goal:** Users can fill chatflows

- [ ] **Public Chatflow Page**
    - [ ] Create dynamic route `/c/[slug]`
    - [ ] Fetch chatflow definition from Supabase
- [ ] **Chat Interface**
    - [ ] Create chat UI (messages, input)
    - [ ] Implement "Typing" indicators
- [ ] **Conversation Engine**
    - [ ] Build logic to ask questions one by one based on schema
    - [ ] Implement basic validation (required fields, data types)
    - [ ] Save progress/answers to `conversation_messages`
- [ ] **Submission**
    - [ ] Save final result to `chatflow_submissions`
    - [ ] Show success/thank you message

## 📊 Phase 4: Results Viewing (Day 4)
**Goal:** Admin can view submissions

- [ ] **Submissions List**
    - [ ] Fetch real submissions from Supabase for `SubmissionsList` component
    - [ ] Display submission metadata (date, status)
- [ ] **Submission Details**
    - [ ] Create detail view for a single submission
    - [ ] Show conversation history
- [ ] **AI Insights**
    - [ ] Generate simple summary of submission using AI
    - [ ] Extract key data points

## 🚀 Phase 5: Polish & Deploy (Day 5)
**Goal:** Production-ready MVP

- [ ] **Refinement**
    - [ ] Add error handling and empty states
    - [ ] Polish UI/UX (transitions, loading skeletons)
- [ ] **Deployment**
    - [ ] Deploy to Vercel Production
    - [ ] Verify environment variables in Vercel
- [ ] **Testing**
    - [ ] End-to-end test of the "Happy Path"
