/* eslint-disable @typescript-eslint/no-redeclare */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postData } from "./UserPost";

export const PosrDetails = () => {
  const [data, setData] = useState<postData>();
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
      `https://gorest.co.in/public/v1/posts/${id}`
    );
    if (res?.status === 200) {
      setData(res?.data?.data);
      setLoading(false);
    }
  };
  return (
    <div>
      <button className="btn btn-primary m-2" onClick={() => navigate(-1)}>
        Back
      </button>

      {loading ? (
        <h1 className="d-flex justify-content-center align-items-center vh-100">
          Loading...
        </h1>
      ) : (
        <>
          <h1 className="d-flex justify-content-center"> Post Details</h1>

          <div className=" col-5 m-auto mt-5">
            <div className="card-body border reduce p-3 ">
              <h5 className="card-title">{data?.title}</h5>
              <p className="card-text">{data?.body}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
