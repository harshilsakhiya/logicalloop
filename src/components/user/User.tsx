import React, { useState, useEffect } from "react";
import axios from "axios";
import { TablePagination } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export interface userData {
  email: string;
  gender: string;
  id: number;
  name: string;
  status: string;
}

function User() {
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState<number>(0);
  const [data, setData] = useState<userData[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const userGet = async () => {
    setLoading(true);
    const res: any = await axios.get(
      `https://gorest.co.in/public/v1/users?page=${page}`
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
      {loading ? (
        <h1 className="d-flex justify-content-center align-items-center vh-100">
          Loading...
        </h1>
      ) : (
        <div>
          <h1 className="d-flex justify-content-center">User Data</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {data?.map((item: userData) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="flex">
                      <button
                        className="btn btn-success m-2"
                        onClick={() => navigate(`/user-edit/${item.id}`)}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/user-post/${item.id}`)}
                      >
                        Post
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
      )}
    </>
  );
}

export default User;
