import Navbar from "@/components/home/header/Navbar";
import SearchInput from "@/components/home/header/SearchInput";
import {ToggleMode} from "@/components/home/header/ToggleMode";
import HeroSection from "@/components/home/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
    </>
   

  );
}
