import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import React, { useState } from "react";

import { api } from "~/utils/api";
const Flats = () => {
  const [input, setInput] = useState("");

  const fetchAllUsers = api
    <>
      <div className="flex flex-row text-white">
        <Input
          className="w-8/12 rounded-full bg-white px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
          type={"text"}
          placeholder={"Name"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input !== "") {
                console.log(input);
              }
            }
          }}
        />
        <Button className="w-4/12" type={"submit"}>
          Submit
        </Button>
      </div>
    </>,
  );
};

export default Flats;
