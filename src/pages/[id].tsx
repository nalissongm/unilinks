import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { api } from "../services/api";

interface LinkProps {
  redirectTo: string;
}

export default function Link({ redirectTo }: LinkProps) {
  useEffect(() => {
    window.location.assign(redirectTo);
  }, [redirectTo]);

  return <h1></h1>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;

  try {
    const response = await api.get(`links/${id}`);
    const redirectTo = response.data.url;

    return {
      props: {
        redirectTo,
      },
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  } catch {
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
