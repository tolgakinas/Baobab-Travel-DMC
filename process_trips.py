import json, re, html, urllib.request

with open("atlas_turkey_trips.json", "r", encoding="utf-8") as f:
    trips = json.load(f)

# Fetch search images
search_imgs = {}
for page in [1, 2, 3]:
    url = f"https://atlasglobaltours.com/trip-search-result/page/{page}/" if page > 1 else "https://atlasglobaltours.com/trip-search-result/"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode("utf-8")
    for m in re.finditer(r"<figure[^>]*>(.*?)</figure>\s*<div class=\"category-trip-content-wrap\">(.*?)</div>\s*</div>", content, re.DOTALL):
        fig, body = m.group(1), m.group(2)
        tm = re.search(r"<h2[^>]*>\s*<a[^>]*href=[\"'](https://atlasglobaltours\.com/trip/[^/]+/)[\"']", body)
        im = re.search(r"(?:data-src|src)=[\"'](https://atlasglobaltours\.com/wp-content/uploads/[^\"'\s]+)[\"']", fig)
        if tm and im:
            search_imgs[tm.group(1)] = im.group(1)

def to_english(text):
    if not text:
        return ""
    text = html.unescape(text)
    # Common Turkish specific words and replacements
    replacements = [
        ("Türkiye", "Turkey"),
        ("Turkiye", "Turkey"),
        ("türkiye", "Turkey"),
        ("turkiye", "Turkey"),
        ("TÜRKİYE", "TURKEY"),
        ("Kaş", "Kas"),
        ("kas", "Kas"),
        ("Kapadokya", "Cappadocia"),
        ("İstanbul", "Istanbul"),
        ("istanbul", "Istanbul"),
        ("İzmir", "Izmir"),
        ("izmir", "Izmir"),
        ("Şanlıurfa", "Sanliurfa"),
        ("Sanliurfa", "Sanliurfa"),
        ("Göbeklitepe", "Gobeklitepe"),
        ("Gobekli Tepe", "Gobeklitepe"),
        ("Topkapı", "Topkapi"),
        ("Divriği", "Divrigi"),
        ("Anıtkabir", "Anitkabir"),
        ("Sümela", "Sumela"),
        ("Yazılıkaya", "Yazilikaya"),
        ("Karahantepe", "Karahantepe"),
        ("Hattuşa", "Hattusa"),
        ("Hattusa", "Hattusa"),
        ("Pamukkale", "Pamukkale"),
        ("Göremede", "in Goreme"),
        ("Göreme", "Goreme"),
        ("Goreme", "Goreme"),
        ("Merhaba ( Hello )", "Hello"),
        ("Merhaba", "Hello"),
        ("Teşekkür Ederiz", "Thank you"),
        ("Teşekkürler", "Thank you"),
        ("kebap", "kebab"),
        ("Kebap", "Kebab"),
    ]
    for orig, rep in replacements:
        text = text.replace(orig, rep)
    
    # Also replace individual Turkish diacritics if any remain
    char_map = {
        "ş": "s", "Ş": "S",
        "ğ": "g", "Ğ": "G",
        "ç": "c", "Ç": "C",
        "ı": "i", "İ": "I",
        "ö": "o", "Ö": "O",
        "ü": "u", "Ü": "U",
    }
    for k, v in char_map.items():
        text = text.replace(k, v)
    return text.strip()

processed = []
for t in trips:
    trip_id = t["id"]
    title = to_english(t["title"]["rendered"])
    # Format title cleanly
    title = re.sub(r"^\s*immersive\s+", "Immersive ", title, flags=re.IGNORECASE)
    # Remove awkward colon spacing
    title = re.sub(r"\s+:\s+", ": ", title)
    link = t.get("link", "")
    img = search_imgs.get(link, "")
    if not img:
        feat = t.get("featured_image")
        if isinstance(feat, dict):
            img = feat.get("source_url", "")
    
    dur_data = t.get("duration", {})
    days = dur_data.get("days", 0)
    nights = dur_data.get("nights", 0)
    unit = dur_data.get("duration_unit", "days")
    if unit == "hours":
        duration_label = f"{days} Hours"
    elif nights > 0:
        duration_label = f"{days} Days / {nights} Nights"
    else:
        duration_label = f"{days} Days"
    
    # Description
    desc_raw = t.get("description", "")
    desc_clean = re.sub(r"<[^>]+>", " ", desc_raw)
    desc_clean = re.sub(r"\s+", " ", desc_clean).strip()
    desc_clean = to_english(desc_clean)
    
    # Inclusions & Exclusions
    inc_raw = t.get("cost_includes", "")
    inc_items = [to_english(line.strip()) for line in inc_raw.split("\n") if line.strip()] if isinstance(inc_raw, str) else []
    exc_raw = t.get("cost_excludes", "")
    exc_items = [to_english(line.strip()) for line in exc_raw.split("\n") if line.strip()] if isinstance(exc_raw, str) else []
    
    # Itineraries
    itin_raw = t.get("itineraries", [])
    clean_itins = []
    if isinstance(itin_raw, list):
        for idx, item in enumerate(itin_raw):
            it_title = to_english(item.get("title", f"Day {idx+1}"))
            it_content = item.get("content", "")
            it_text = re.sub(r"<[^>]+>", " ", it_content)
            it_text = re.sub(r"\s+", " ", it_text).strip()
            it_text = to_english(it_text)
            clean_itins.append({
                "dayNumber": idx + 1,
                "title": it_title,
                "description": it_text
            })
    
    # Determine destinations visited from title and itinerary
    dest_candidates = [
        "Istanbul", "Cappadocia", "Ephesus", "Pamukkale", "Bodrum", "Antalya", 
        "Lycian Way", "Kas", "Kars", "Ani", "Trabzon", "Gobeklitepe", "Sanliurfa", 
        "Mount Nemrut", "Gallipoli", "Troy", "Dalyan", "Pergamon", "Konya", "Ankara", "Izmir"
    ]
    all_text = (title + " " + desc_clean + " " + " ".join([it["title"] for it in clean_itins])).lower()
    destinations = [d for d in dest_candidates if d.lower() in all_text]
    if not destinations:
        destinations = ["Turkey"]
        
    # Group size
    min_pax = t.get("min_pax", 2)
    max_pax = t.get("max_pax", 10)
    group_size = f"{min_pax}–{max_pax} Guests (Small Group)"

    # Category
    cat = "Small Group Tour"
    if any(k in title.lower() for k in ["hike", "hiking", "adventure", "bike", "kayak"]):
        cat = "Active Adventure & Hiking"
    elif "rail" in title.lower():
        cat = "Iconic Rail Journey"
    elif "culinary" in title.lower() or "cultural" in title.lower():
        cat = "Culinary & Cultural Expedition"
    elif "churches" in title.lower():
        cat = "Historical & Heritage Tour"
    elif "short break" in title.lower() or "walking tour" in title.lower():
        cat = "City Break & Walking Tour"
    
    # Highlights
    raw_highlights = [it["title"] for it in clean_itins[:4]] if clean_itins else destinations[:4]
    
    processed.append({
        "id": f"trip-{trip_id}",
        "atlasId": trip_id,
        "title": title,
        "slug": t.get("slug", ""),
        "category": cat,
        "duration": duration_label,
        "daysCount": days,
        "groupSize": group_size,
        "image": img,
        "destinations": destinations,
        "description": desc_clean,
        "itinerary": clean_itins,
        "includes": inc_items,
        "excludes": exc_items,
        "highlights": raw_highlights,
        "originalUrl": link
    })

print(f"Successfully processed {len(processed)} trips!")
with open("processed_trips.json", "w", encoding="utf-8") as out:
    json.dump(processed, out, ensure_ascii=False, indent=2)
