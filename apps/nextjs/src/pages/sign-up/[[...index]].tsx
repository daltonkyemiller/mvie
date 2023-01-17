import { SignUp } from '@clerk/nextjs';
import { Page } from '@components';

const SignUpPage = () => (
  <Page>
    <div className="flex flex-col items-center justify-center gap-6">
      <header>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Sign up</h1>
      </header>
      <section>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </section>
    </div>
  </Page>
);

export default SignUpPage;
