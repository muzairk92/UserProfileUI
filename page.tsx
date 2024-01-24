import styles from './page.module.css';
import { ServerAuthProvider } from '../../auth/server-auth-provider';
import  UserProfile  from './UserProfile';
import { Metadata } from 'next';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';
import { cookies } from 'next/headers';
import { authConfig } from '../../config/server-config';
import { getFirebaseAdminApp } from '../firebase';
import { getFirestore } from 'firebase-admin/firestore';

// const db = getFirestore(getFirebaseAdminApp());
// async function getUserCounter(): Promise<number> {
//   const tokens = await getTokens(cookies(), authConfig);
//
//   if (!tokens) {
//     throw new Error("Cannot get counter of unauthenticated user");
//   }
//
//   const snapshot = await db
//     .collection("user-counters")
//     .doc(tokens.decodedToken.uid)
//     .get();
//
//   const currentUserCounter = await snapshot.data();
//
//   if (!currentUserCounter) {
//     return 0;
//   }
//
//   return currentUserCounter.count;
// }

export default async function Profile() {
  // const count = await getUserCounter();

  return (
    <div className={styles.container}>
      <UserProfile/>

      {/*<ServerAuthProvider>*/}
      {/*  <UserProfile count={count} incrementCounter={incrementCounter} />*/}
      {/*</ServerAuthProvider>*/}
    </div>
  );
}

// Generate customized metadata based on user cookies
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(): Promise<Metadata> {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    return {};
  }

  return {
    title: `${tokens.decodedToken.email} profile page`,
  };
}
