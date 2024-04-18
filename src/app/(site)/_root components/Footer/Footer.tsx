import { Container } from "@/components/Container";
export function Footer() {
  return (
    <Container py={4} mb={4}>
      <p className="text-center">
        Blogger by{" "}
        <a
          href="https://github.com/SheryConcepts"
          target="_blank"
          className="text-green-600 underline"
        >
          Shery
        </a>
      </p>
    </Container>
  );
}
