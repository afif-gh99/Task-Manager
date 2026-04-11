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
      tone: "total",
    },
    {
      title: "Pending",
      val: counts.pending,
      icon: <FaRegClock />,
      tone: "pending",
    },
    {
      title: "In Progress",
      val: counts.inProgress,
      icon: <TbProgressCheck />,
      tone: "progress",
    },
    {
      title: "Completed",
      val: counts.done,
      icon: <MdFileDownloadDone />,
      tone: "completed",
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
          tone={card.tone}
        />
      ))}
    </div>
  );
};

export default Cards;
