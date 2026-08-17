import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// Users
export async function getUser(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function updateUser(userId: string, data: Record<string, unknown>) {
  const docRef = doc(db, "users", userId);
  return updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
}

// Projects
export async function getProjects(userId: string) {
  const q = query(
    collection(db, "projects"),
    where("userId", "==", userId),
    orderBy("lastAccessedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createProject(userId: string, data: Record<string, unknown>) {
  return addDoc(collection(db, "projects"), {
    ...data,
    userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastAccessedAt: Timestamp.now(),
  });
}

export async function getProject(projectId: string) {
  const docRef = doc(db, "projects", projectId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function updateProject(projectId: string, data: Record<string, unknown>) {
  const docRef = doc(db, "projects", projectId);
  return updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
}

export async function deleteProject(projectId: string) {
  const docRef = doc(db, "projects", projectId);
  return deleteDoc(docRef);
}

// Chat
export async function createConversation(projectId: string) {
  return addDoc(collection(db, "chatConversations"), {
    projectId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function getConversations(projectId: string) {
  const q = query(
    collection(db, "chatConversations"),
    where("projectId", "==", projectId),
    orderBy("updatedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getMessages(conversationId: string) {
  const q = query(
    collection(db, "chatMessages"),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addMessage(conversationId: string, role: string, content: string) {
  return addDoc(collection(db, "chatMessages"), {
    conversationId,
    role,
    content,
    createdAt: Timestamp.now(),
  });
}

// Past Questions
export async function getQuestions(
  examType?: string,
  subject?: string,
  year?: number,
  search?: string
) {
  let q = query(collection(db, "pastQuestions"));

  if (examType) {
    q = query(q, where("examType", "==", examType));
  }
  if (subject) {
    q = query(q, where("subject", "==", subject));
  }
  if (year) {
    q = query(q, where("year", "==", year));
  }

  q = query(q, limit(100));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getQuestion(questionId: string) {
  const docRef = doc(db, "pastQuestions", questionId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Bookmarks
export async function getBookmarks(userId: string) {
  const q = query(
    collection(db, "bookmarkedQuestions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addBookmark(userId: string, questionId: string) {
  return addDoc(collection(db, "bookmarkedQuestions"), {
    userId,
    questionId,
    createdAt: Timestamp.now(),
  });
}

export async function removeBookmark(bookmarkId: string) {
  const docRef = doc(db, "bookmarkedQuestions", bookmarkId);
  return deleteDoc(docRef);
}

// Uploaded Notes
export async function getNotes(projectId: string) {
  const q = query(
    collection(db, "uploadedNotes"),
    where("projectId", "==", projectId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addNote(projectId: string, data: Record<string, unknown>) {
  return addDoc(collection(db, "uploadedNotes"), {
    ...data,
    projectId,
    createdAt: Timestamp.now(),
  });
}

export async function deleteNote(noteId: string) {
  const docRef = doc(db, "uploadedNotes", noteId);
  return deleteDoc(docRef);
}

// Study Plans
export async function getStudyPlan(projectId: string) {
  const q = query(
    collection(db, "studyPlans"),
    where("projectId", "==", projectId),
    limit(1)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0
    ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    : null;
}

export async function createStudyPlan(projectId: string, data: Record<string, unknown>) {
  return addDoc(collection(db, "studyPlans"), {
    ...data,
    projectId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function updateStudyPlan(planId: string, data: Record<string, unknown>) {
  const docRef = doc(db, "studyPlans", planId);
  return updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
}

export async function deleteStudyPlan(planId: string) {
  const docRef = doc(db, "studyPlans", planId);
  return deleteDoc(docRef);
}

// Study Plan Tasks
export async function getStudyPlanTasks(studyPlanId: string) {
  const q = query(
    collection(db, "studyPlanTasks"),
    where("studyPlanId", "==", studyPlanId),
    orderBy("date", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateStudyPlanTask(taskId: string, completed: boolean) {
  const docRef = doc(db, "studyPlanTasks", taskId);
  return updateDoc(docRef, {
    completed,
    completedAt: completed ? Timestamp.now() : null,
  });
}

// Practice Sessions
export async function getPracticeSessions(userId: string) {
  const q = query(
    collection(db, "practiceSessions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createPracticeSession(userId: string, data: Record<string, unknown>) {
  return addDoc(collection(db, "practiceSessions"), {
    ...data,
    userId,
    createdAt: Timestamp.now(),
  });
}

export async function updatePracticeSession(sessionId: string, data: Record<string, unknown>) {
  const docRef = doc(db, "practiceSessions", sessionId);
  return updateDoc(docRef, data);
}

// Subscriptions
export async function getSubscription(userId: string) {
  const q = query(
    collection(db, "subscriptions"),
    where("userId", "==", userId),
    where("status", "==", "active"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0
    ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    : null;
}

export async function createSubscription(userId: string, data: Record<string, unknown>) {
  return addDoc(collection(db, "subscriptions"), {
    ...data,
    userId,
    createdAt: Timestamp.now(),
  });
}

export async function updateSubscription(userId: string, status: "active" | "cancelled" | "free") {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, {
    subscriptionStatus: status,
    updatedAt: Timestamp.now(),
  });
}
