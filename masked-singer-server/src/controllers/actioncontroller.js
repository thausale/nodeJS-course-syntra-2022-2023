import Singer from "../models/singers.js";

export async function getAll(req, res) {
  try {
    const { name } = req.query;
    const data = await Singer.find();
    if (name) {
      const filteredSingers = data.filter((singer) => {
        console.log(singer.participant);
        return singer?.participant?.toLowerCase().includes(name.toLowerCase());
      });
      return res.json(filteredSingers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching singers" });
  }
}

export async function getById(req, res) {
  const { id } = req.params;

  try {
    const singer = await Singer.findById(id);
    if (singer) {
      res.json(singer);
    } else {
      res.status(404).json({ message: "Singer not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching singer" });
  }
}

// export const getByName = async (req, res) => {
//   const { deelnemer } = req.query;
//   console.log(req.query);
//   try {
//     let query = {};

//     if (deelnemer) {
//       query = { deelnemer: deelnemer };
//     }

//     const singers = await Singer.find(query);

//     res.json(singers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching singers" });
//   }
// };
