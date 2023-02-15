import Singer from "../models/singers.js";

export async function getAll(req, res) {
  try {
    const { name } = req.query;
    const data = await Singer.find();
    const updatedData = updateImageUrls(data);
    // console.log(data);
    if (name) {
      const filteredSingers = updatedData.filter((singer) => {
        console.log(singer.name);
        return singer?.name?.toLowerCase().includes(name.toLowerCase());
      });
      return res.json(filteredSingers);
    }
    // console.log(data);
    res.json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching singers" });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const singer = await Singer.findById(id);
    const updatedSinger = updateImageUrls(singer);
    if (updatedSinger) {
      res.json(updatedSinger);
    } else {
      res.status(404).json({ message: "Singer not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching singer" });
  }
}

export async function updateSinger(req, res) {
  const { id } = req.params;
  const { name, image, place, episodeCount, startedEpisode, participant } =
    req.body;

  try {
    const singer = await Singer.findById(id);

    if (singer) {
      singer.name = name || singer.name;
      singer.image = image || singer.image;
      singer.place = place || singer.place;
      singer.episodeCount = episodeCount || singer.episodeCount;
      singer.startedEpisode = startedEpisode || singer.startedEpisode;
      singer.participant = participant || singer.participant;

      const updatedSinger = await singer.save();
      res.json(updatedSinger);
    } else {
      res.status(404).json({ message: "Singer not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating singer" });
  }
}

export async function deleteSinger(req, res) {
  const { id } = req.params;

  try {
    const singer = await Singer.findById(id);

    if (singer) {
      await singer.remove();
      res.json({ message: "Singer removed" });
    } else {
      res.status(404).json({ message: "Singer not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting singer" });
  }
}

export async function createSinger(req, res) {
  const { name, image, place, episodeCount, startedEpisode, participant } =
    req.body;

  try {
    const singer = new Singer({
      name,
      image,
      place,
      episodeCount,
      startedEpisode,
      participant,
    });

    const newSinger = await singer.save();
    res.status(201).json(newSinger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating singer" });
  }
}

function updateImageUrls(singers) {
  return singers.map((singer) => {
    singer.image = `http://localhost:3000/images/${singer.image}`;
    return singer;
  });
}
