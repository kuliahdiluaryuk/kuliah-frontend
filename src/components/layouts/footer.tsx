import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-center text-xs md:text-sm text-muted-foreground w-full mt-8">
      <div className="flex justify-center gap-4 mb-4">
        <Link href={"/contact-us"}>Contact Us</Link>
        <p>|</p>
        <Link href={"/terms-and-condition"}>Terms and Condition</Link>
        <p>|</p>
        <Link href={"/refund-policy"}>Refund Policy</Link>
      </div>
    </footer>
  );
};
