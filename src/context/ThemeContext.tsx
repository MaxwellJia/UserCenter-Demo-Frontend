"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { theme as antdTheme, type ThemeConfig } from "antd";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  antdThemeConfig: ThemeConfig;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                         children,
                                                                       }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "light"; // Default to light theme

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Ant Design theme configuration
  const antdThemeConfig = {
    algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorBgContainer: theme === "dark" ? "#1f2937" : "#ffffff", // 对应 gray-800
      colorBgElevated: theme === "dark" ? "#1f2937" : "#ffffff", // 对应 gray-800
      colorBgLayout: theme === "dark" ? "#1f2937" : "#ffffff", // 对应 gray-800
      colorBorder: theme === "dark" ? "#374151" : "#d9d9d9", // 对应 gray-700
      colorText: theme === "dark" ? "#ffffff" : "#000000",
      colorTextSecondary: theme === "dark" ? "#a6a6a6" : "#666666",
      // ProTable 特定样式
      colorFillSecondary: theme === "dark" ? "#374151" : "#f5f5f5", // 表格行背景
      colorFillTertiary: theme === "dark" ? "#4b5563" : "#fafafa", // 表格悬停背景
    },
  };

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme, antdThemeConfig }}>
        {children}
      </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
