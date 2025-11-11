import { type ReactNode, useState, useMemo } from "react";
import { AppShell, Stack, NavLink, TextInput } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  IconDashboard,
  IconNotes,
  IconPackage,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";

type MenuItem = {
  label: string;
  icon: ReactNode;
  path?: string;
  children?: MenuItem[];
};

// Navigation converted from the provided Next.js snippet into a structure
const navigation: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <IconDashboard size={16} />,
    path: "/dashboard",
  },
  {
    label: "Users",
    icon: <IconUsers size={16} />,
  },
  {
    label: "Listing",
    icon: <IconPackage size={16} />,
  },
  {
    label: "Escrow",
    icon: <IconWallet size={16} />,
  },
  {
    label: "System Logs",
    icon: <IconNotes size={16} />,
    path: "/expenses",
  },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  // Helper to flatten all menu items for search

  // Filter navigation based on search
  const filteredNavigation = useMemo(() => {
    if (!search.trim()) return navigation;
    const q = search.trim().toLowerCase();
    // Show parents if any child matches
    function filterItems(items: MenuItem[]): MenuItem[] {
      return items
        .map((item) => {
          if (item.children) {
            const filteredChildren = filterItems(item.children);
            if (
              filteredChildren.length > 0 ||
              item.label.toLowerCase().includes(q)
            ) {
              return { ...item, children: filteredChildren };
            }
            return null;
          }
          if (item.label.toLowerCase().includes(q)) return item;
          return null;
        })
        .filter(Boolean) as MenuItem[];
    }
    return filterItems(navigation);
  }, [search]);

  // Print mode detection: use location.state from POS page
  const isPrintMode = !!(location.state as { printMode?: boolean } | undefined)
    ?.printMode;

  if (isPrintMode) {
    // Only render print-area content (Outlet)
    return <Outlet />;
  }

  return (
    <AppShell
      header={{ height: 40 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: true },
      }}
      padding="md"
      styles={{
        main: { backgroundColor: "#ffffffff" },
      }}
    >
      {/* Header */}
      <AppShell.Header
        style={{ background: "#F5F5F5", padding: "16px", height: "40px" }}
      >
        {/* You can add header content here if needed */}
      </AppShell.Header>
      {/* Sidebar */}
      {!isPrintMode && (
        <AppShell.Navbar p="md" bg="#F5F5F5">
          <Stack gap="xs">
            <TextInput
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              mb={8}
              size="sm"
              styles={{ input: { borderRadius: 8 } }}
            />
            {filteredNavigation.map((item: MenuItem) => {
              // If item has children render a parent NavLink containing child NavLinks
              if (item.children && item.children.length > 0) {
                return (
                  <NavLink
                    key={item.label}
                    label={item.label}
                    leftSection={item.icon}
                    styles={{
                      root: {
                        color: "#000000ff",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "14px",
                        marginBottom: 2,
                      },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                  >
                    {item.children.map((child: MenuItem) => {
                      const isActive = location.pathname === child.path;
                      return (
                        <NavLink
                          key={child.label}
                          component={Link}
                          to={child.path || "#"}
                          label={child.label}
                          leftSection={child.icon}
                          active={isActive}
                          styles={{
                            root: {
                              color: isActive ? "#fff" : "#000000ff",
                              backgroundColor: isActive ? "#333" : undefined,
                              borderRadius: "8px",
                              marginLeft: 16,
                              fontWeight: isActive ? 800 : 500,
                              fontSize: "13px",
                              "&:hover": { backgroundColor: "#333" },
                            },
                            label: { fontSize: "13px", fontWeight: 500 },
                          }}
                        />
                      );
                    })}
                  </NavLink>
                );
              }

              // Default single-level nav item
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.label}
                  component={Link}
                  to={item.path || "#"}
                  label={item.label}
                  leftSection={item.icon}
                  active={isActive}
                  styles={{
                    root: {
                      color: isActive ? "#fff" : "#000000ff",
                      backgroundColor: isActive ? "#333" : undefined,
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#333" },
                      fontWeight: isActive ? 800 : undefined,
                    },
                    label: { fontSize: "14px", fontWeight: 600 },
                  }}
                />
              );
            })}
          </Stack>
        </AppShell.Navbar>
      )}

      {/* Main Content */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
