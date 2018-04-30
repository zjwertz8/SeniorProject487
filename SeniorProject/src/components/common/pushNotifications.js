import PushNotification from 'react-native-push-notification';

const configure = () => {
	PushNotification.configure({


    onRegister: token => console.log('Token', token),

    onNotification: notification => console.log('Notification', notification),
    

    permissions: {
    	alert: true,
    	badge: true,
    	sound: true
    },

    popInitialNotification: true,
    requestPermissions: true,

	});
};

const localNotification = (message) => {
   console.log(message);
	PushNotification.localNotification({
		bigText: "Big Text",
		title: "Notif Title",
		message: message,
	})
}

export { configure, localNotification, };