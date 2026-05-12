/* =====================================================
   🌟 MODERN PROFILE PAGE
   Full Backend Connected + Social Features
===================================================== */

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

export default function Profile() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [user,
    setUser] =
    useState({});

  const [followers,
    setFollowers] =
    useState(0);

  const [following,
    setFollowing] =
    useState(0);

  const [products,
    setProducts] =
    useState([]);

  const [isFollowing,
    setIsFollowing] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [users,
    setUsers] =
    useState([]);

  const [editMode,
    setEditMode] =
    useState(false);

  const [profileImage,
    setProfileImage] =
    useState(null);

  const [coverImage,
    setCoverImage] =
    useState(null);

  const [formData,
    setFormData] =
    useState({

      name: "",

      role: "",

      bio: "",

      location: "",
    });

  /* =====================================================
      LOAD PROFILE
  ===================================================== */

  useEffect(() => {

    loadProfile();

  }, [id]);

  const loadProfile =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(

            `https://full-stack-backend-qps4.onrender.com/auth/profile/${id}`
          );

        setUser(res.data);

        setFollowers(
          res.data.followers || 0
        );

        setFollowing(
          res.data.following || 0
        );

        setFormData({

          name:
            res.data.name || "",

          role:
            res.data.role || "",

          bio:
            res.data.bio || "",

          location:
            res.data.location || "",
        });

        /* PRODUCTS */

        const productRes =
          await axios.get(

            "https://backend-api-yduq.onrender.com/products"
          );

        const userProducts =

          Array.isArray(
            productRes.data
          )

            ? productRes.data.filter(
                (p) =>
                  p.farmer_id ==
                  id
              )

            : [];

        setProducts(
          userProducts
        );

        /* FOLLOW CHECK */

        if (
          currentUser
        ) {

          const followRes =
            await axios.get(

              `https://full-stack-backend-qps4.onrender.com/follow/following/${currentUser.id}`
            );

          const check =
            followRes.data.some(
              (f) =>
                f.following_id ==
                id
            );

          setIsFollowing(
            check
          );
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      FOLLOW
  ===================================================== */

  const follow =
    async () => {

      try {

        await axios.post(

          "https://backend-api-yduq.onrender.com/follow",

          {
            userId:
              currentUser.id,

            targetId: id,
          }
        );

        setFollowers(
          followers + 1
        );

        setIsFollowing(true);

      } catch (err) {

        console.log(err);
      }
    };

  /* =====================================================
      UNFOLLOW
  ===================================================== */

  const unfollow =
    async () => {

      try {

        await axios.post(

          "https://backend-api-yduq.onrender.com/follow/unfollow",

          {
            userId:
              currentUser.id,

            targetId: id,
          }
        );

        setFollowers(
          followers - 1
        );

        setIsFollowing(false);

      } catch (err) {

        console.log(err);
      }
    };

  /* =====================================================
      SEARCH USERS
  ===================================================== */

  const searchUsers =
    async (text) => {

      setSearch(text);

      if (!text) {

        setUsers([]);

        return;
      }

      try {

        const res =
          await axios.get(

            `https://full-stack-backend-qps4.onrender.com/auth/search/${text}`
          );

        setUsers(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  /* =====================================================
      UPDATE PROFILE
  ===================================================== */

  const updateProfile =
    async () => {

      try {

        const data =
          new FormData();

        data.append(
          "name",
          formData.name
        );

        data.append(
          "role",
          formData.role
        );

        data.append(
          "bio",
          formData.bio
        );

        data.append(
          "location",
          formData.location
        );

        if (
          profileImage
        ) {

          data.append(
            "image",
            profileImage
          );
        }

        if (
          coverImage
        ) {

          data.append(
            "coverImage",
            coverImage
          );
        }

        await axios.put(

          `https://full-stack-backend-qps4.onrender.com/auth/update/${id}`,

          data
        );

        alert(
          "Profile Updated ✅"
        );

        setEditMode(
          false
        );

        loadProfile();

      } catch (err) {

        console.log(err);

        alert(
          "Update Failed ❌"
        );
      }
    };

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div style={container}>

      {/* GLOW */}

      <div style={glow1}></div>

      <div style={glow2}></div>

      {/* SEARCH */}

      <div style={searchWrapper}>

        <input
          type="text"
          placeholder="🔍 Search farmers, consumers..."
          value={search}
          onChange={(e) =>
            searchUsers(
              e.target.value
            )
          }
          style={searchInput}
        />

        {
          users.length > 0 && (

            <div style={searchResult}>

              {
                users.map((u) => (

                  <div
                    key={u.id}
                    style={userLink}
                    onClick={() => {

                      navigate(
                        `/profile/${u.id}`
                      );

                      setUsers([]);

                    }}
                  >

                    <img
                      src={
                        u.image

                          ? `https://full-stack-backend-qps4.onrender.com${u.image}`

                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }

                      alt=""

                      style={searchImg}
                    />

                    <div>

                      <h4>
                        {u.name}
                      </h4>

                      <p>
                        🌱 {u.role}
                      </p>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

      {/* COVER */}

      <div style={coverSection}>

        <img
          src={
            user.coverImage

              ? `https://full-stack-backend-qps4.onrender.com${user.coverImage}`

              : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          }

          alt=""

          style={coverImg}
        />

      </div>

      {/* PROFILE CARD */}

      <div style={profileCard}>

        <img
          src={
            user.image

              ? `https://full-stack-backend-qps4.onrender.com${user.image}`

              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }

          alt=""

          style={profileImg}
        />

        {
          editMode ? (

            <>

              <input
                style={input}
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    name:
                      e.target.value,
                  })
                }
                placeholder="Name"
              />

              <textarea
                style={textarea}
                value={
                  formData.bio
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    bio:
                      e.target.value,
                  })
                }
                placeholder="Bio"
              />

              <input
                style={input}
                value={
                  formData.location
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    location:
                      e.target.value,
                  })
                }
                placeholder="Location"
              />

              <input
                type="file"
                onChange={(e) =>
                  setProfileImage(
                    e.target.files[0]
                  )
                }
                style={uploadInput}
              />

              <input
                type="file"
                onChange={(e) =>
                  setCoverImage(
                    e.target.files[0]
                  )
                }
                style={uploadInput}
              />

              <button
                style={saveBtn}
                onClick={
                  updateProfile
                }
              >
                Save Profile ✅
              </button>

            </>

          ) : (

            <>

              <h1 style={name}>
                {user.name}
              </h1>

              <p style={role}>
                🌱 {user.role}
              </p>

              <p style={bio}>
                {user.bio}
              </p>

              <p style={location}>
                📍 {user.location}
              </p>

            </>
          )
        }

        {/* STATS */}

        <div style={stats}>

          <div style={statCard}>
            <h2>
              {followers}
            </h2>
            <p>
              Followers
            </p>
          </div>

          <div style={statCard}>
            <h2>
              {following}
            </h2>
            <p>
              Following
            </p>
          </div>

          <div style={statCard}>
            <h2>
              {products.length}
            </h2>
            <p>
              Products
            </p>
          </div>

        </div>

        {/* BUTTONS */}

        {
          currentUser?.id ==
          id ? (

            <button
              style={editBtn}
              onClick={() =>
                setEditMode(
                  !editMode
                )
              }
            >

              {
                editMode
                  ? "Cancel"
                  : "Edit Profile ✏️"
              }

            </button>

          ) : (

            isFollowing ? (

              <button
                style={unfollowBtn}
                onClick={
                  unfollow
                }
              >
                Unfollow ❌
              </button>

            ) : (

              <button
                style={followBtn}
                onClick={follow}
              >
                Follow ❤️
              </button>

            )
          )
        }

      </div>

      {/* PRODUCTS */}

      <div style={productSection}>

        <h2 style={productTitle}>
          🌿 Farmer Products
        </h2>

        <div style={grid}>

          {
            products.length ===
            0 ? (

              <div style={empty}>
                No products yet
              </div>

            ) : (

              products.map((p) => (

                <div
                  key={p.id}
                  style={productCard}
                >

                  <img
                    src={`https://full-stack-backend-qps4.onrender.com${p.image}`}

                    alt=""

                    style={productImg}
                  />

                  <div style={productContent}>

                    <h3>
                      {p.name}
                    </h3>

                    <p style={price}>
                      ₹{p.price}
                    </p>

                    <button
                      style={buyBtn}
                    >
                      Buy Now 🛒
                    </button>

                  </div>

                </div>
              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg,#020617,#0f172a,#052e16)",

  color: "white",

  position: "relative",

  overflow: "hidden",

  paddingBottom: "60px",
};

const glow1 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(120px)",

  top: "-120px",

  left: "-120px",
};

const glow2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.15)",

  filter: "blur(120px)",

  bottom: "-120px",

  right: "-120px",
};

const searchWrapper = {

  padding: "25px",

  position: "relative",

  zIndex: 2,
};

const searchInput = {

  width: "100%",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  outline: "none",

  fontSize: "16px",
};

const searchResult = {

  background:
    "rgba(15,23,42,0.95)",

  marginTop: "10px",

  borderRadius: "18px",

  overflow: "hidden",

  backdropFilter:
    "blur(16px)",
};

const userLink = {

  display: "flex",

  alignItems: "center",

  gap: "14px",

  padding: "16px",

  cursor: "pointer",

  borderBottom:
    "1px solid rgba(255,255,255,0.06)",
};

const searchImg = {

  width: "55px",

  height: "55px",

  borderRadius: "50%",

  objectFit: "cover",
};

const coverSection = {

  height: "360px",

  position: "relative",
};

const coverImg = {

  width: "100%",

  height: "100%",

  objectFit: "cover",
};

const profileCard = {

  width: "90%",

  maxWidth: "900px",

  margin:
    "-110px auto 0",

  background:
    "rgba(15,23,42,0.82)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "32px",

  padding: "35px",

  textAlign: "center",

  position: "relative",

  zIndex: 2,

  boxShadow:
    "0 20px 50px rgba(0,0,0,0.35)",
};

const profileImg = {

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  objectFit: "cover",

  border:
    "6px solid #22c55e",

  marginTop: "-120px",
};

const name = {

  fontSize: "42px",

  marginTop: "20px",
};

const role = {

  color: "#22c55e",

  fontWeight: "bold",

  marginTop: "12px",

  fontSize: "18px",
};

const bio = {

  color: "#cbd5e1",

  marginTop: "18px",

  lineHeight: "1.8",
};

const location = {

  marginTop: "10px",

  color: "#94a3b8",
};

const stats = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(150px,1fr))",

  gap: "20px",

  marginTop: "35px",
};

const statCard = {

  background:
    "rgba(255,255,255,0.05)",

  padding: "24px",

  borderRadius: "22px",
};

const followBtn = {

  marginTop: "28px",

  padding: "14px 28px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const unfollowBtn = {

  ...followBtn,

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",
};

const editBtn = {

  ...followBtn,

  background:
    "linear-gradient(90deg,#3b82f6,#2563eb)",
};

const saveBtn = {

  ...followBtn,
};

const uploadInput = {

  marginTop: "15px",

  color: "white",
};

const input = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border: "none",

  marginTop: "16px",

  background:
    "rgba(255,255,255,0.08)",

  color: "white",
};

const textarea = {

  ...input,

  minHeight: "120px",

  resize: "none",
};

const productSection = {

  padding: "40px",
};

const productTitle = {

  fontSize: "40px",

  marginBottom: "30px",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",

  gap: "28px",
};

const productCard = {

  background:
    "rgba(15,23,42,0.82)",

  borderRadius: "28px",

  overflow: "hidden",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.35)",
};

const productImg = {

  width: "100%",

  height: "260px",

  objectFit: "cover",
};

const productContent = {

  padding: "22px",
};

const price = {

  marginTop: "10px",

  color: "#22c55e",

  fontSize: "24px",

  fontWeight: "bold",
};

const buyBtn = {

  marginTop: "18px",

  width: "100%",

  padding: "14px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const empty = {

  padding: "30px",

  color: "#cbd5e1",
};