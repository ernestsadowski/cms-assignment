"use client";

const CSS = ({ code }: { code?: string }) => {
  if (!code) return null;

  return (
    <style jsx>{`
      ${code}
    `}</style>
  );
};

export default CSS;
