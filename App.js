import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startPauseHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setMilliseconds(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const mils = Math.floor((milliseconds % 1000) / 10);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${mils < 10 ? '0' + mils : mils}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime()}</Text>
      <View style={styles.buttons}>
        <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={startPauseHandler} />
        <Button title="Reiniciar" onPress={resetHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});
