import { TabsAuthForm } from "@/components/auth/TabsAuthForm";

const LoginPage = async () => {
  return (
    <div className="w-full h-screen ">
      <section className="container h-full w-full flex items-center justify-center">
        <TabsAuthForm />
      </section>
    </div>
  );
};

export default LoginPage;
