import { FaRegClock, FaTasks } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import Card from "./Card";

const Cards = ({ counts }) => {
  const cards = [
    {
      title: "Total Tasks",
      val: counts.total,
      icon: <FaTasks />,
      color: "text-orange",
      bgColor: "bg-[rgba(243,131,6,0.10)]",
    },
    {
      title: "Pending",
      val: counts.pending,
      icon: <FaRegClock />,
      color: "text-[var(--color-status-pending-text)]",
      bgColor: "bg-[rgba(255,217,122,0.22)]",
    },
    {
      title: "In Progress",
      val: counts.inProgress,
      icon: <TbProgressCheck />,
      color: "text-[var(--color-primary)]",
      bgColor: "bg-[rgba(93,142,246,0.14)]",
    },
    {
      title: "Completed",
      val: counts.done,
      icon: <MdFileDownloadDone />,
      color: "text-[var(--color-status-done-bg)]",
      bgColor: "bg-[rgba(79,209,116,0.16)]",
    },
  ];
  return (
    <div className="mt-8 grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          val={card.val}
          icon={card.icon}
          color={card.color}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

export default Cards;
