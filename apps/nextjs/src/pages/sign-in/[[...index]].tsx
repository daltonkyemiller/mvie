import { SignIn } from '@clerk/nextjs';
import { Page } from '@components';

const SignInPage = () => (
  <Page>
    <div className="flex flex-col items-center justify-center gap-6">
      <header>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Sign In</h1>
      </header>
      <section>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </section>
    </div>
  </Page>
);

export default SignInPage;
