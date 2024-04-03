// Help us for Android to warm up the browser. The faster comes up faster on Android.

import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        }
    }, []);
}