import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL;

function Router() {
  const [location] = useLocation();
  
  
  let normalizedLocation = location;
  if (base !== '/' && location.startsWith(base.slice(0, -1))) {
    normalizedLocation = location.replace(base.slice(0, -1), '') || '/';
    if (!normalizedLocation.startsWith('/')) {
      normalizedLocation = '/' + normalizedLocation;
    }
  }

  return (
    <Switch location={normalizedLocation}>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
