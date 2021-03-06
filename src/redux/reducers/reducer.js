import {
	FILTER_SEARCH,
	SORT_BY_NAME,
	SORT_BY_CREATION,
	SELECT_FAVOURITE,
	GET_SINGLE_USER,
	SET_LAYOUT,
} from "../constants/types";
import { contacts } from "../../utils/data";

const intialState = {
	data: contacts,
	filteredData: contacts,
	singleContact: [],
	layout: "grid",
};

const sortArray = (type, data) => {
	if (type === "name") {
		const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));

		return sorted;
	}
	const sorted = [...data].sort((a, b) => a.created.localeCompare(b.created));

	return sorted;
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case FILTER_SEARCH: {
			const search = action.payload.search;
			const userContacts = state.data;

			const filteredResults = !search
				? userContacts
				: userContacts.filter((user) => {
						return user.name.toLowerCase().includes(search.toLowerCase());
				  });

			return {
				...state,
				filteredData: filteredResults,
			};
		}

		case SELECT_FAVOURITE: {
			return {
				...state,
				filteredData: action.payload,
			};
		}

		case SORT_BY_NAME: {
			const filteredContact = state.filteredData;
			const sortByName = sortArray("name", filteredContact);

			return {
				...state,
				filteredData: sortByName,
			};
		}

		case SORT_BY_CREATION: {
			const filteredCreation = state.filteredData;
			const sortByCreation = sortArray("created", filteredCreation);

			return {
				...state,
				filteredData: sortByCreation,
			};
		}

		case GET_SINGLE_USER: {
			const getUser = state.data.find(
				(user) => user.shortName === action.payload
			);

			return {
				...state,
				singleContact: getUser,
			};
		}

		case SET_LAYOUT: {
			return {
				...state,
				layout: action.payload,
			};
		}

		default:
			return state;
	}
};

export default reducer;
