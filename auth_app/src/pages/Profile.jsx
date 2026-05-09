import { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Profile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({});

  const [followers, setFollowers] =
    useState(0);

  const [following, setFollowing] =
    useState(0);

  const [products, setProducts] =
    useState([]);

  const [isFollowing, setIsFollowing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  /* EDIT MODE */

  const [editMode, setEditMode] =
    useState(false);

  const [profileImage, setProfileImage] =
    useState(null);

  const [coverImage, setCoverImage] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      role: "",
      bio: "",
      location: "",
    });

  useEffect(() => {

    loadProfile();

  }, [id]);

  /* LOAD PROFILE */

  const loadProfile = async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/auth/profile/${id}`
        );

      setUser(res.data);

      setFollowers(res.data.followers);

      setFollowing(res.data.following);

      setFormData({
        name: res.data.name || "",
        role: res.data.role || "",
        bio: res.data.bio || "",
        location:
          res.data.location || "",
      });

      /* PRODUCTS */

      const productRes =
        await axios.get(
          "http://localhost:5000/products"
        );

      const userProducts =
        productRes.data.filter(
          (p) => p.farmer_id == id
        );

      setProducts(userProducts);

      /* FOLLOW CHECK */

      if (currentUser) {

        const followRes =
          await axios.get(
            `http://localhost:5000/follow/following/${currentUser.id}`
          );

        const followCheck =
          followRes.data.some(
            (f) =>
              f.following_id == id
          );

        setIsFollowing(followCheck);
      }

    } catch (err) {

      console.log(err);
    }
  };

  /* FOLLOW */

  const follow = async () => {

    await axios.post(
      "http://localhost:5000/follow",
      {
        userId: currentUser.id,
        targetId: id,
      }
    );

    setFollowers(followers + 1);

    setIsFollowing(true);
  };

  /* UNFOLLOW */

  const unfollow = async () => {

    await axios.post(
      "http://localhost:5000/follow/unfollow",
      {
        userId: currentUser.id,
        targetId: id,
      }
    );

    setFollowers(followers - 1);

    setIsFollowing(false);
  };

  /* SEARCH */

  const searchUsers =
    async (text) => {

      setSearch(text);

      if (!text) {

        setUsers([]);

        return;
      }

      const res =
        await axios.get(
          `http://localhost:5000/auth/search/${text}`
        );

      setUsers(res.data);
    };

  /* UPDATE PROFILE */

  const updateProfile = async () => {

    try {

      const data = new FormData();

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

      if (profileImage) {

        data.append(
          "image",
          profileImage
        );
      }

      if (coverImage) {

        data.append(
          "coverImage",
          coverImage
        );
      }

      await axios.put(
        `http://localhost:5000/auth/update/${id}`,
        data
      );

      alert(
        "Profile Updated ✅"
      );

      setEditMode(false);

      loadProfile();

    } catch (err) {

      console.log(err);

      alert(
        "Update Failed ❌"
      );
    }
  };

  return (

    <div style={container}>

      {/* SEARCH */}

      <div style={searchBox}>

        <input
          type="text"
          placeholder="Search farmers, consumers..."
          value={search}
          onChange={(e) =>
            searchUsers(e.target.value)
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
                          ? `http://localhost:5000${u.image}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt=""
                      style={searchImg}
                    />

                    <div>

                      <h4>{u.name}</h4>

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

      {/* COVER IMAGE */}

      <div style={coverSection}>

        <img
          src={
            user.coverImage
              ? `http://localhost:5000${user.coverImage}`
              : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          }
          alt=""
          style={coverImg}
        />

        {
          currentUser?.id == id &&
          editMode && (

            <input
              type="file"
              onChange={(e) =>
                setCoverImage(
                  e.target.files[0]
                )
              }
              style={uploadInput}
            />
          )
        }

      </div>

      {/* PROFILE CARD */}

      <div style={profileCard}>

        <img
          src={
            user.image
              ? `http://localhost:5000${user.image}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
          style={profileImg}
        />

        {
          currentUser?.id == id &&
          editMode && (

            <input
              type="file"
              onChange={(e) =>
                setProfileImage(
                  e.target.files[0]
                )
              }
              style={uploadInput}
            />
          )
        }

        {
          editMode ? (

            <>

              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                placeholder="Name"
                style={input}
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value,
                  })
                }
                style={input}
              >

                <option value="farmer">
                  Farmer
                </option>

                <option value="consumer">
                  Consumer
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio:
                      e.target.value,
                  })
                }
                placeholder="Bio..."
                style={textarea}
              />

              <input
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
                style={input}
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

              <h1>{user.name}</h1>

              <p style={role}>
                🌱 {user.role}
              </p>

              <p style={bio}>
                {user.bio}
              </p>

              <p>
                📍 {user.location}
              </p>

            </>
          )
        }

        {/* STATS */}

        <div style={stats}>

          <div>
            <h3>{followers}</h3>
            <p>Followers</p>
          </div>

          <div>
            <h3>{following}</h3>
            <p>Following</p>
          </div>

          <div>
            <h3>{products.length}</h3>
            <p>Products</p>
          </div>

        </div>

        {/* ACTION BUTTONS */}

        {
          currentUser?.id == id ? (

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
                onClick={unfollow}
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

      <h2 style={productTitle}>
        🌿 Products
      </h2>

      <div style={grid}>

        {
          products.length === 0 ? (

            <p
              style={{
                paddingLeft: "20px",
              }}
            >
              No products yet
            </p>

          ) : (

            products.map((p) => (

              <div
                key={p.id}
                style={productCard}
              >

                <img
                  src={`http://localhost:5000${p.image}`}
                  alt=""
                  style={productImg}
                />

                <h3>{p.name}</h3>

                <p>
                  ₹{p.price}
                </p>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "#020617",
  color: "#fff",
  paddingBottom: "50px",
};

const searchBox = {
  padding: "20px",
  position: "relative",
};

const searchInput = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

const searchResult = {
  background: "#1e293b",
  marginTop: "10px",
  borderRadius: "12px",
  overflow: "hidden",
};

const userLink = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  cursor: "pointer",
  borderBottom:
    "1px solid #334155",
};

const searchImg = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};

const coverSection = {
  height: "320px",
  position: "relative",
};

const coverImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const profileCard = {
  marginTop: "-100px",
  textAlign: "center",
  padding: "20px",
};

const profileImg = {
  width: "170px",
  height: "170px",
  borderRadius: "50%",
  border: "5px solid #020617",
  objectFit: "cover",
};

const role = {
  color: "#22c55e",
  fontWeight: "bold",
  marginTop: "10px",
};

const bio = {
  color: "#cbd5e1",
  maxWidth: "600px",
  margin: "10px auto",
};

const stats = {
  display: "flex",
  justifyContent: "center",
  gap: "50px",
  marginTop: "25px",
};

const followBtn = {
  marginTop: "20px",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  background: "#22c55e",
  color: "#fff",
  cursor: "pointer",
};

const unfollowBtn = {
  marginTop: "20px",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer",
};

const editBtn = {
  marginTop: "20px",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const saveBtn = {
  marginTop: "20px",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  background: "#22c55e",
  color: "#fff",
  cursor: "pointer",
};

const uploadInput = {
  marginTop: "10px",
  color: "#fff",
};

const input = {
  width: "100%",
  maxWidth: "400px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginTop: "12px",
};

const textarea = {
  width: "100%",
  maxWidth: "400px",
  height: "100px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginTop: "12px",
};

const productTitle = {
  marginLeft: "20px",
  marginTop: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill,minmax(250px,1fr))",
  gap: "20px",
  padding: "20px",
};

const productCard = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "15px",
};

const productImg = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "10px",
};