def get_emojis(score):
    if score >= 7:
        return "🤩"
    elif score >= 5 and score < 7:
        return "😄"
    elif score == 4:
        return "😢"
    else:
        return "😭"
