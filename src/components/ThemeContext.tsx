import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<{
    isDarkMode: boolean;
    toggleTheme: () => void;
}>({ isDarkMode: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme: () => {} }}>
            {children}
        </ThemeContext.Provider>
    );
};