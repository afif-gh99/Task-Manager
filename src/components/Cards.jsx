import { FaRegClock, FaTasks } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import Card from "./Card";

const Cards = ({ counts }) => {
  const cards = [
    {
      title: "Total",
      val: counts.total,
      icon: <FaTasks />,
      tone: "total",
      eyebrow: "Portfolio",
      support: "All tracked",
    },
    {
      title: "Pending",
      val: counts.pending,
      icon: <FaRegClock />,
      tone: "pending",
      eyebrow: "Attention",
      support: "Waiting to start",
    },
    {
      title: "In Progress",
      val: counts.inProgress,
      icon: <TbProgressCheck />,
      tone: "progress",
      eyebrow: "Momentum",
      support: "Currently moving",
    },
    {
      title: "Done",
      val: counts.done,
      icon: <MdFileDownloadDone />,
      tone: "completed",
      eyebrow: "Delivered",
      support: "Closed out",
    },
  ];
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          val={card.val}
          icon={card.icon}
          tone={card.tone}
          eyebrow={card.eyebrow}
          support={card.support}
          animationDelay={index * 70}
        />
      ))}
    </div>
  );
};

export default Cards;
