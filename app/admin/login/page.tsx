import LoginForm from "./LoginForm";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminLoginPage() {
  const locale = await getAdminLocale();
  const dict = getDictionary(locale);

  return <LoginForm dict={dict} />;
}
