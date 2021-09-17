const Notification = ({ message, error }) => {
    if(message) {
        const notificationColor = error ? "red" : "green";
        const notificationStyle = {
            border: `5px solid ${notificationColor}`,
            color: notificationColor,
            fontSize: 15,
            padding: 10,
            marginBottom: 30,
        }

        return (
            <div style={notificationStyle}>
                {message}
            </div>
        );
    }

    return null;
}

export default Notification;