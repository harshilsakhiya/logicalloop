import { TablePagination } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export interface postData {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

export const UserPost = () => {
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState<number>(0);
  const [data, setData] = useState<postData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPostByUser();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPostByUser = async () => {
    setLoading(true);
    const res: any = await axios.get(
      `https://gorest.co.in/public/v1/posts?user_id=${id}`
    );
    if (res?.status === 200) {
      setData(res?.data?.data);
      setDataCount(res?.data?.meta?.pagination?.total);
      setLoading(false);
    }
  };
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <Link to={"/"}>
        <button className="btn btn-primary m-2">Back</button>
      </Link>

      {loading ? (
        <h1 className="d-flex justify-content-center align-items-center vh-100">
          Loading...
        </h1>
      ) : data.length > 0 ? (
        <div>
          <h1 className="d-flex justify-content-center">Post Data By User </h1>

          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>title</th>
                <th>Action</th>
              </tr>
            </thead>
            {data?.map((item: postData) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <div className="flex">
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => navigate(`/post-details/${item.id}`)}
                      >
                        view
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={dataCount}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
          />
        </div>
      ) : (
        <h1 className="d-flex justify-content-center align-items-center vh-100">
          No Data{" "}
        </h1>
      )}
    </>
  );
};
