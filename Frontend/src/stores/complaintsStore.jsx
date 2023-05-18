import create from "zustand";
import axios from "axios";

const complaintsStore = create((set) => ({
  complaints: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchComplaints: async () => {
    // Fetch the complaints
    const res = await axios.get("http://localhost:8070/complaints");

    // Set to state
    set({ complaints: res.data.complaints });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createComplaint: async (e) => {
    e.preventDefault();

    const { createForm, complaints } = complaintsStore.getState();
    const res = await axios.post(
      "http://localhost:8070/complaints",
      createForm
    );

    set({
      complaints: [...complaints, res.data.complaint],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

deleteComplaint: async (_id) => {
  try {
    // Delete the complaint
    await axios.delete(`http://localhost:8070/complaints/${_id}`);

    // Update state
    set((state) => ({
      complaints: state.complaints.filter((complaint) => complaint._id !== _id),
    }));
  } catch (error) {
    console.error(error);
  }
}
,

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updateComplaint: async (e) => {
    e.preventDefault();

    const {
      updateForm: { title, body, _id },
      complaints,
    } = complaintsStore.getState();

    // Send the update request
    const res = await axios.put(`http://localhost:8070/complaints/${_id}`, {
      title,
      body,
    });

    // Update state
    const newComplaints = [...complaints];
    const complaintIndex = complaints.findIndex((complaint) => {
      return complaint._id === _id;
    });
    newComplaints[complaintIndex] = res.data.complaint;

    set({
      complaints: newComplaints,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
}));

export default complaintsStore;