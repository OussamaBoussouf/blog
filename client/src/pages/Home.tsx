import useSWR from "swr";
import axiosApi from "../api/axios";
import BlogList from "../components/BlogList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = (url: string) => axiosApi.get(url).then(({ data }) => data);
  const { data, isLoading } = useSWR(
    `/blogs?page=${searchParams.get("page") || 0}`,
    fetcher
  );

  const handlePageClick = (currentPage: string) => {
    if (Number(currentPage) === 1) {
      setSearchParams("");
    } else {
      setSearchParams({ page: currentPage });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <>
      <BlogList blogs={data?.blogs} isLoading={isLoading} />
      <Pagination
        currentPage={parseInt(searchParams.get("page") ?? "1")}
        totalPages={data?.totalPages}
        onPageChange={handlePageClick}
        next={data?.next}
        previous={data?.previous}
      />
    </>
  );
}

export default Home;
