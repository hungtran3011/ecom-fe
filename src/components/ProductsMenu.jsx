import { cn } from "../libs/utils"
import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const PHONE_BRANDS = ["Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme"];
const LAPTOP_BRANDS = ["Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft"];
const TABLET_BRANDS = ["Apple", "Samsung", "Microsoft", "Lenovo", "Huawei"];
const PC_BRANDS = ["Dell", "HP", "Lenovo", "Asus", "Acer"];
const SCREEN_BRANDS = ["Samsung", "LG", "Dell", "Acer", "BenQ"];
const ACCESSORY_BRANDS = ["Apple", "Samsung", "Logitech", "Razer", "Corsair"];
const CATEGORIES = {
    phones: PHONE_BRANDS,
    laptops: LAPTOP_BRANDS,
    tablets: TABLET_BRANDS,
    screens: SCREEN_BRANDS,
    accessories: ACCESSORY_BRANDS,
};
const PHONE_CRITERIA = ["Thin", "Long-lasting", "High-end", "Mid-range", "Budget"];
const LAPTOP_CRITERIA = ["Gaming", "Business", "Student", "Budget"];
const TABLET_CRITERIA = ["High-end", "Mid-range", "Budget"];
const PC_CRITERIA = ["Gaming", "Business", "Student", "Budget"];
const SCREEN_CRITERIA = ["4K", "Curved", "Gaming", "Budget"];
const ACCESSORY_CRITERIA = ["Gaming", "Office", "Travel", "Budget"];

export default function ProductsMenu() {
    const [selected, setSelected] = useState("phones");
    const handleSelect = (category) => {
        setSelected(category);
    }
    return (
        <div className="fixed left-0 mt-4 flex p-3 items-start justify-baseline gap-2 z-1000 bg-[var(--md-sys-color-surface-bright)] border-[--md-sys-color-outline] shadow-lg w-full">
            <div className="flex flex-col justify-center items-start gap-3 shrink-0 self-stretch w-1/5">
                <SubMenuItem
                    label="Phones"
                    link="/products/phones"
                    selected={selected === "phones"}
                    onClick={() => handleSelect("phones")}
                    onMouseEnter={() => handleSelect("phones")}
                />
                <SubMenuItem
                    label="Laptops"
                    link="/products/laptops"
                    selected={selected === "laptops"}
                    onClick={() => handleSelect("laptops")}
                    onMouseEnter={() => handleSelect("laptops")}
                />
                <SubMenuItem
                    label="Tablets"
                    link="/products/tablets"
                    selected={selected === "tablets"}
                    onClick={() => handleSelect("tablets")}
                    onMouseEnter={() => handleSelect("tablets")}
                />
                <SubMenuItem
                    label="PC"
                    link="/products/pc"
                    selected={selected === "pc"}
                    onClick={() => handleSelect("pc")}
                    onMouseEnter={() => handleSelect("pc")}
                />
                <SubMenuItem
                    label="Screens"
                    link="/products/screens"
                    selected={selected === "screens"}
                    onClick={() => handleSelect("screens")}
                    onMouseEnter={() => handleSelect("screens")}
                />
                <SubMenuItem
                    label="Accessories"
                    link="/products/accessories"
                    selected={selected === "accessories"}
                    onClick={() => handleSelect("accessories")}
                    onMouseEnter={() => handleSelect("accessories")}
                />
            </div>
            {
                selected === "phones" && (
                    <GeneralCategoryMenu
                        brands={PHONE_BRANDS}
                        criteria={PHONE_CRITERIA}
                        category="phones"
                    />
                )
            }
            {
                selected === "laptops" && (
                    <GeneralCategoryMenu
                        brands={LAPTOP_BRANDS}
                        criteria={LAPTOP_CRITERIA}
                        category="laptops"
                    />
                )
            }
            {
                selected === "tablets" && (
                    <GeneralCategoryMenu
                        brands={TABLET_BRANDS}
                        criteria={TABLET_CRITERIA}
                        category="tablets"
                    />
                )
            }
            {
                selected === "pc" && (
                    <GeneralCategoryMenu
                        brands={PC_BRANDS}
                        criteria={PC_CRITERIA}
                        category="pc"
                    />
                )
            }
            {
                selected === "screens" && (
                    <GeneralCategoryMenu
                        brands={SCREEN_BRANDS}
                        criteria={SCREEN_CRITERIA}
                        category="screens"
                    />
                )
            }
            {
                selected === "accessories" && (
                    <GeneralCategoryMenu
                        brands={ACCESSORY_BRANDS}
                        criteria={ACCESSORY_CRITERIA}
                        category="accessories"
                    />
                )
            }
        </div>
    )
}

function GeneralCategoryMenu({ brands, criteria, category }) {
    // Fix: Using a more specific state that keeps track of both type and selection
    const [hoverState, setHoverState] = useState({ type: "", item: "" });
    
    const handleSelect = (type, item) => {
        setHoverState({ type, item });
    };
    
    const isSelected = (type, item) => {
        return hoverState.type === type && hoverState.item === item;
    };
    
    return (
        <div className="flex px-4 items-center justify-center gap-9 self-stretch w-full">
            <div className="flex flex-col justify-baseline items-start gap-3 self-stretch w-1/4">
                <p className="text-center font-semibold text-[var(--md-sys-color-on-surface)]">Brands</p>
                {brands.map((brand) => (
                    <SubMenuItem
                        key={brand}
                        label={brand}
                        link={`/products/${category}/brand/${brand.toLowerCase()}`}
                        selected={isSelected("brand", brand)}
                        onClick={() => handleSelect("brand", brand)}
                        onMouseEnter={() => handleSelect("brand", brand)}
                        onMouseLeave={() => setHoverState({ type: "", item: "" })}
                    />
                ))}
            </div>
            <div className="flex flex-col justify-baseline items-start gap-3 self-stretch w-1/4">
                <p className="text-center font-semibold text-[var(--md-sys-color-on-surface)]">Criteria</p>
                {criteria.map((criterion) => (
                    <SubMenuItem
                        key={criterion}
                        label={criterion}
                        link={`/products/${category}/criteria/${criterion.toLowerCase().replace(/ /g, '-')}`}
                        selected={isSelected("criteria", criterion)}
                        onClick={() => handleSelect("criteria", criterion)}
                        onMouseEnter={() => handleSelect("criteria", criterion)}
                        onMouseLeave={() => setHoverState({ type: "", item: "" })}
                        className=""
                    />
                ))}
            </div>
            <div className="flex w-full justify-center items-start gap-3 self-stretch">
                <div className="grid grid-cols-2 gap-4 w-1/2">
                    {["Image 1", "Image 2", "Image 3", "Image 4"].map((image, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-md">
                                <span>{image}</span>
                            </div>
                            <p className="mt-2 text-sm font-medium text-[var(--md-sys-color-on-surface)]">{`Name ${index + 1}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function SubMenuItem({ label, link, className, selected, onClick, onMouseEnter, onMouseLeave }) {
    // Fixed CSS class with proper closing bracket
    return (
        <div 
            className={cn(
                "flex justify-center p-2 rounded-md w-full", 
                className, 
                selected 
                    ? "font-semibold bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]" 
                    : "bg-[var(--md-sys-color-surface-bright)] text-[var(--md-sys-color-on-surface)]"
            )} 
            onClick={onClick} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
        >
            <Link to={link} className="text-inherit w-full">{label}</Link>
        </div>
    )
}