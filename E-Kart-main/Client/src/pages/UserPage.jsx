import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { motion, useScroll, useTransform } from "framer-motion";

const UserPage = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const [name, setName] = useState(userEmail?.split("@")[0] || "");
  const [editing, setEditing] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* ✅ Parallax Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-600 to-purple-500"
      ></motion.div>

      <div className="relative flex items-center justify-center pt-40 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center z-10"
        >
          {/* ✅ Avatar */}
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=4f46e5&color=fff&rounded=true&size=96`}
            alt="User Avatar"
            className="mx-auto mb-4 w-24 h-24 rounded-full border-4 border-indigo-600 shadow-lg"
          />

          {/* ✅ User Name */}
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          )}

          <p className="text-lg text-gray-600">{userEmail}</p>

          {/* ✅ Edit / Save Button */}
          <div className="mt-4 flex justify-center gap-4">
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Edit Profile
              </button>
            )}

            {/* ✅ Logout Button */}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserPage;
