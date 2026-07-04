"use client";
import { useState } from "react";
import Link from "next/link";
const NewHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between p-5 bg-amber-800">
      <h1>Jesus</h1>
      <span
        onClick={() => {
          setOpen(!open);
        }}
        className="cursor-pointer"
      >
        open
      </span>
      {open && (
        <div
          className="bg-black opacity-50 fixed inset-0"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
      <div
        className={`bg-gray-400 min-h-full w-50 fixed left-0 top-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col">
          <Link href="/">Mina</Link>
          <Link href="/store">store</Link>
          <Link href="/sales">sales</Link>
          <Link href="/contact">contact</Link>
        </ul>
      </div>
    </div>
  );
};

export default NewHeader;
