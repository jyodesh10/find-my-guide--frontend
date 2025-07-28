import moment from "moment/moment";

export const dateFormatter = (createddate) => {
    const date = Date(createddate);
    return moment(date).format("Do MMMM  h:mm a")
}