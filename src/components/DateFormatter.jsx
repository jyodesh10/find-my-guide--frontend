import moment from "moment/moment";

export const dateFormatter = (createddate) => {
    const date = Date(createddate);
    return moment(date).format("Do MMMM  h:mm a")
}


export const profiledateFormatter = (dateString) => {
if (dateString) {
    return moment(dateString).format('YYYY-MM-DD');
}
return '';
};