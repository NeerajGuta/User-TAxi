import React, {createContext, useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';

// Create the context
const SocketContext = createContext();

// Provide the context
export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io('http://your-server-url:3000'); // Replace with your backend URL
    setSocket(socketInstance);

    // Listen for driver updates
    socketInstance.on('updateDrivers', updatedDrivers => {
      setDrivers(updatedDrivers);
    });

    // Start tracking location
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});

        // Emit user's location to the server
        socketInstance.emit('updateUserLocation', {latitude, longitude});
      },
      error => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update location every 10 meters
      },
    );

    return () => {
      // Cleanup on unmount
      socketInstance.disconnect();
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket, drivers, userLocation}}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use the context
export const useSocket = () => useContext(SocketContext);
