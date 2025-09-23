import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext"; // <-- make sure this path is correct

export const useLoading = () => useContext(LoadingContext);
