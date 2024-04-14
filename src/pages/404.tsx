import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: "/" }, undefined, { shallow: true });
  }, [router]);

  return (
    <div>
      <p>Заданої сторінки не існує, перенаправлення на основну...</p>
    </div>
  );
}
