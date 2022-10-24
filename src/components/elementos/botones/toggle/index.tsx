import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

const Toggle = (props: { initialValue: boolean; setBooleanValue: Function }) => {
  const [enabled, setEnabled] = useState(props.initialValue);

  useEffect(() => {
    props.setBooleanValue(enabled);
  }, [enabled]);

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-blue-500" : "bg-gray-400"} relative inline-flex h-7 w-12 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
