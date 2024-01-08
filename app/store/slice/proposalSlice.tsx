import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/lib/end_point";
import { addDays } from "date-fns";

const initialState = {
  proposals: [],
  success: false,
  proposalsByWarehouse: [],
  selectedProposals: [],
  error: null,
  archived: [],
};

export const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setProposals: (state, action: PayloadAction<any>) => {
      const copy = [...action.payload];
      const filtered = copy.sort((a, b) => {
        return parseInt(b.proposal_number) - parseInt(a.proposal_number);
      });
      state.proposals = filtered;
    },
    setSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
    },
    setProposalsByWarehouse: (state, action: PayloadAction<any>) => {
      const filtered = state.proposals.filter((proposal) => {
        if (proposal.warehouse_statuses.length === 0) return false;
        return (
          proposal.warehouse_statuses[proposal.warehouse_statuses.length - 1]
            .warehouse_id === action.payload
        );
      });

      const sorted = filtered.sort((a, b) => {
        return parseInt(b.proposal_number) - parseInt(a.proposal_number);
      });

      state.proposalsByWarehouse = sorted;
    },
    setSelectedProposals: (state, action: PayloadAction<any>) => {
      state.selectedProposals = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    setArchived: (state, action: PayloadAction<any>) => {
      const copy = [...action.payload];
      const filtered = copy.sort((a, b) => {
        return parseInt(b.proposal_number) - parseInt(a.proposal_number);
      });
      state.archived = filtered;
    },
  },
});

export const {
  setProposals,
  setSuccess,
  setSelectedProposals,
  setProposalsByWarehouse,
  setError,
  setArchived,
} = proposalSlice.actions;

export const getAllProposals = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/proposal`);
    dispatch(setProposals(response.data.proposals));
  } catch (error) {
    console.error(error);
  }
};

export const getAllArchivedProposals = () => async (dispatch) => {
  try {
    const response = await axios.get(`${END_POINT}/proposal/archived`);

    dispatch(setArchived(response.data.proposals));
  } catch (error) {
    console.error(error);
  }
};

export const addProposal = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${END_POINT}/proposal`, data);
    if (response.status === 200) {
      dispatch(getAllProposals());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// export const getProposalById = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${END_POINT}/proposal/${id}`);
//     console.log(response);
//     dispatch(setProposal(response.data.proposal));

//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateProposal = (id, data) => async (dispatch) => {
  try {
    const response = await axios.patch(`${END_POINT}/proposal/${id}`, data);

    if (response.status === 200) {
      dispatch(getAllProposals());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export const deleteProposal = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${END_POINT}/proposal/${id}`);

    if (response.status === 200) {
      dispatch(getAllProposals());
      dispatch(setSuccess(true));
    }
  } catch (error) {
    console.error(error);
  }
};

export const moveProposalsToWarehouse = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${END_POINT}/warehouse/move`, data);
    if (response.status === 200) {
      dispatch(getAllProposals());
      dispatch(setSuccess(true));
      dispatch(setProposalsByWarehouse(data.warehouse_id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const createLocalExpense = (data, proposalId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${END_POINT}/proposal/local-expense/${proposalId}`,
      data
    );
    if (response.status === 200) {
      dispatch(getAllProposals());
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteLocalExpense = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${END_POINT}/proposal/local-expense/${id}`
    );
    if (response.status === 200) {
      dispatch(getAllProposals());
    }
  } catch (error) {
    console.error(error);
  }
};

export default proposalSlice.reducer;
