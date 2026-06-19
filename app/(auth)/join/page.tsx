import { redirect } from "next/navigation";
import {
  auth,
  isGoogleOAuthConfigured,
  isLocalDevAuthEnabled,
  signIn,
} from "../../../auth";

export default async function JoinPage() {
  const session = await auth();

  if (session?.user?.status === "ACTIVE") {
    redirect("/dashboard");
  }

  if (session?.user) {
    redirect("/apply");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="section-label">Join ShardUp</p>
        <h1>Start with your account.</h1>
        <p>
          Signing in creates your ShardUp identity. Full member access is granted
          after your application is reviewed.
        </p>
        {isLocalDevAuthEnabled ? (
          <form
            action={async () => {
              "use server";
              await signIn("local-dev", {
                email: "developer@shardup.local",
                name: "Local Developer",
                redirectTo: "/dashboard",
              });
            }}
          >
            <button className="secondary-button" type="submit">
              Continue as local developer
            </button>
          </form>
        ) : null}
        {isGoogleOAuthConfigured ? (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button className="button" type="submit">
              Continue with Google
            </button>
          </form>
        ) : !isLocalDevAuthEnabled ? (
          <div className="form-message error">
            Google sign-in is not configured yet. Add <code>AUTH_GOOGLE_ID</code> and{" "}
            <code>AUTH_GOOGLE_SECRET</code> to <code>.env.local</code>, then restart
            the dev server.
          </div>
        ) : null}
        {isLocalDevAuthEnabled ? (
          <p className="dev-note">
            Local developer sign-in is available only in development and creates
            an active admin test user in your local database.
          </p>
        ) : null}
      </section>
    </main>
  );
}
