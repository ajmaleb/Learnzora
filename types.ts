

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT'
}

export enum LearningMethod {
  VISUAL = 'Visual',
  STORY = 'Story',
  PATTERN = 'Pattern',
  REPETITION = 'Repetition',
  CONVERSATIONAL = 'Conversational'
}

export interface Attachment {
  id: string;
  type: 'file' | 'image' | 'voice';
  name: string;
  url?: string; // Object URL or base64
  duration?: number; // For voice messages in seconds
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  grade: string;
  learningStyle: 'Visual' | 'Auditory' | 'Kinesthetic';
  emotionalState: 'Focused' | 'Frustrated' | 'Bored' | 'Neutral';
  progress: number; // 0-100
  verifiedRecords: VerifiedRecord[];
}

export interface StudentFullDetails extends StudentProfile {
  studentIdNumber: string;
  dob: string;
  gender: string;
  nationality: string;
  phone: string;
  address: string;
  emergencyContact: string;
  parentName: string;
  parentPhone: string;
  bloodGroup: string;
  enrollmentDate: string;
  educationQualification: string;
  house: string;
  scholarship: string;
  enrolledCourses: string[];
  feeStatus: 'Cleared' | 'Pending' | 'Overdue';
  libraryStatus: 'Active' | 'Blocked' | 'No Dues';
  examEligibility: 'Eligible' | 'Not Eligible' | 'Conditional';
  attendanceRate: number;
}

export interface VerifiedRecord {
  id: string;
  course: string;
  score: number;
  date: string;
  hash: string; // Blockchain simulation
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sentiment?: string;
  attachments?: Attachment[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index
  explanation: string;
}

export interface QuizData {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface AdaptiveContent {
  type: LearningMethod;
  content: string; // Markdown or special format
  flashcards?: Flashcard[]; // Only for repetition
  svg?: string; // Only for visual
  imageUrl?: string; // URL for topic-related image
}

export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  subject: 'Physics' | 'Chemistry' | 'Biology';
  image: string;
  video?: string; // URL for AI-generated or simulated video
}

export interface VideoLesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string; // URL for the lesson video
  completed: boolean;
}

export interface AudioLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'Audio Description' | 'Podcast' | 'Screen Reader Friendly';
}

export interface AccessibilityConfig {
  font: 'Inter' | 'Lexend' | 'Atkinson Hyperlegible' | 'OpenDyslexic';
  bgTheme: 'Default' | 'Cream' | 'SoftBlue';
  animations: boolean;
  alignment: 'left' | 'justify';
}

export interface MemoryItem {
  id: string;
  topic: string;
  lastReviewed: string;
  retention: number; // 0-100%
  nextReview: string;
  status: 'Critical' | 'Review Soon' | 'Stable';
}

export interface Notification {
  id: string;
  type: 'missed_class' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionPayload?: string; // e.g., Topic ID to generate replay for
}

export interface ClassReplay {
  topic: string;
  date: string;
  summary: string;
  keyConcepts: string[];
  transcriptStart: string;
  homework: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Lesson' | 'Quiz' | 'Assignment' | 'Streak';
  icon: string; // Lucide icon name placeholder
}

export interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  issueDate: string;
  grade: string;
  verificationCode: string;
}

export interface SeminarSession {
  id: string;
  topic: string;
  teacher: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  participants: number;
  description: string;
  date: string;
}

export interface SeminarScript {
  intro: string;
  points: string[];
  conclusion: string;
}

// Teacher Dashboard Types

export interface AtRiskStudent {
  id: string;
  name: string;
  avatar: string;
  riskFactors: ('Attendance Drop' | 'Late Submission' | 'Low Score' | 'Portal Inactivity')[];
  lastActive: string;
  overallGrade: string; // e.g., 'C-'
  trend: 'Down' | 'Stable' | 'Up';
}

export interface HomeworkFeedback {
  grade: string;
  score: number; // 0-100
  feedback: string;
  corrections: string[];
}

export interface QuestionBankItem {
  question: string;
  answer: string;
  type: 'Multiple Choice' | 'Short Answer';
  options?: string[]; // If multiple choice
}

export interface StudentDoubt {
  id: string;
  studentName: string;
  avatar: string;
  grade: string;
  topic: string; // "General" or derived
  query: string; // The doubt text
  teacherReply?: string;
  attachments?: any; // JSON string or parsed array
  timestamp: string;
  status: 'Pending' | 'Resolved';
}

export interface TeacherAssessment {
  id: number;
  teacherId: string;
  title: string;
  topic: string;
  questions: QuestionBankItem[];
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt?: string;
  submitted?: number; // 1 if submitted, 0 if not (for student view)
  aiGrade?: { score: number; feedback: string; corrections: string[] };
  xpAwarded?: number;
}

export interface AssessmentSubmission {
  id: number;
  assessmentId: number;
  studentId: string;
  studentName?: string;
  answers: string[];
  aiGrade?: { score: number; feedback: string; corrections: string[] };
  xpAwarded: number;
  submittedAt: string;
}