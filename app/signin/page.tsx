import styles from "./signin.module.css";
import Link from "next/link";
import HandcraftedLogo from "@/app/ui/handcrafted-logo";

export default function SignInPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <HandcraftedLogo />
        <h2 className={styles.title}>Welcome Back</h2>
        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <Link href="/" className={styles.back}>← Back to home</Link>
      </div>
    </div>
  );
}