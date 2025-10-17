import { MenuIcon, X } from "lucide-react";

const Toggle = () => (
  <label className="md:hidden">
    <input id="header-toggle" type="checkbox" hidden />

    <span className="header-open:hidden">
      <MenuIcon />
    </span>
    <span className="header-closed:hidden">
      <X />
    </span>
  </label>
);

export default Toggle;
