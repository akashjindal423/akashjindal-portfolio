"""
PM Toolkit PDF Generator
Generates 20 professional PM template PDFs using reportlab.
Output: public/downloads/pm-toolkit/
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus.flowables import Flowable
from reportlab.pdfgen import canvas as pdfcanvas

# ── Brand colours ──────────────────────────────────────────────────────────────
INDIGO   = colors.HexColor("#6366F1")
EMERALD  = colors.HexColor("#10B981")
AMBER    = colors.HexColor("#F59E0B")
RED      = colors.HexColor("#EF4444")
BG_LIGHT = colors.HexColor("#F8FAFC")
WHITE    = colors.white
BLACK    = colors.HexColor("#111827")
GRAY     = colors.HexColor("#6B7280")
GRAY_LIGHT = colors.HexColor("#E5E7EB")
BLUE     = colors.HexColor("#3B82F6")
PURPLE   = colors.HexColor("#8B5CF6")
GREEN_LIGHT = colors.HexColor("#DCFCE7")
BLUE_LIGHT  = colors.HexColor("#DBEAFE")
YELLOW_LIGHT = colors.HexColor("#FEF9C3")
RED_LIGHT   = colors.HexColor("#FEE2E2")

OUTPUT_DIR = "public/downloads/pm-toolkit"

W, H = A4   # 595.28 x 841.89 pts
MARGIN = 18 * mm


# ── Reusable canvas callback for header / footer ───────────────────────────────
def make_page_template(tool_name: str, category: str):
    def on_page(canvas, doc):
        canvas.saveState()
        # Header bar
        canvas.setFillColor(INDIGO)
        canvas.rect(MARGIN, H - MARGIN - 22, W - 2 * MARGIN, 22, fill=1, stroke=0)
        canvas.setFillColor(WHITE)
        canvas.setFont("Helvetica-Bold", 11)
        canvas.drawString(MARGIN + 6, H - MARGIN - 15, tool_name)
        canvas.setFont("Helvetica", 8)
        canvas.drawRightString(W - MARGIN - 6, H - MARGIN - 15, category)

        # Footer
        canvas.setFillColor(GRAY)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawString(MARGIN, MARGIN - 4, "PM Toolkit  ·  Akash Jindal  ·  akashjindal.com")
        canvas.drawRightString(W - MARGIN, MARGIN - 4, f"Page {doc.page}")
        canvas.setStrokeColor(GRAY_LIGHT)
        canvas.line(MARGIN, MARGIN + 4, W - MARGIN, MARGIN + 4)
        canvas.restoreState()
    return on_page


# ── Style helpers ──────────────────────────────────────────────────────────────
def base_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle("ToolTitle",  fontName="Helvetica-Bold", fontSize=16,
                               textColor=BLACK, spaceAfter=4))
    styles.add(ParagraphStyle("SectionHead", fontName="Helvetica-Bold", fontSize=9,
                               textColor=INDIGO, spaceBefore=8, spaceAfter=3))
    styles.add(ParagraphStyle("Body",        fontName="Helvetica", fontSize=8.5,
                               textColor=BLACK, leading=13))
    styles.add(ParagraphStyle("Small",       fontName="Helvetica", fontSize=7.5,
                               textColor=GRAY, leading=11))
    styles.add(ParagraphStyle("SmallBold",   fontName="Helvetica-Bold", fontSize=7.5,
                               textColor=BLACK, leading=11))
    styles.add(ParagraphStyle("Note",        fontName="Helvetica-Oblique", fontSize=7.5,
                               textColor=GRAY, leading=11))
    return styles


def blank_rows(n, cols, alt=True):
    """Generate n empty alternating-bg rows with `cols` columns."""
    rows = []
    for i in range(n):
        bg = BG_LIGHT if (alt and i % 2 == 0) else WHITE
        rows.append([""] * cols + [bg])   # last element = colour marker (stripped in build)
    return rows


def build_table(header, data_rows, col_widths, alt=True, header_color=INDIGO):
    """Build a styled reportlab Table."""
    all_rows = [header]
    row_bgs = []
    for i, row in enumerate(data_rows):
        if isinstance(row[-1], colors.Color):
            row_bgs.append((i + 1, row[-1]))
            row = row[:-1]
        else:
            row_bgs.append((i + 1, BG_LIGHT if (alt and i % 2 == 0) else WHITE))
        all_rows.append(list(row))

    t = Table(all_rows, colWidths=col_widths, repeatRows=1)
    style = [
        ("BACKGROUND",   (0, 0), (-1, 0), header_color),
        ("TEXTCOLOR",    (0, 0), (-1, 0), WHITE),
        ("FONTNAME",     (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0), 8),
        ("ALIGN",        (0, 0), (-1, -1), "LEFT"),
        ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 8),
        ("ROWBACKGROUND",(0, 1), (-1, -1), WHITE),
        ("GRID",         (0, 0), (-1, -1), 0.4, GRAY_LIGHT),
        ("LEFTPADDING",  (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING",   (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
    ]
    for row_idx, bg in row_bgs:
        style.append(("BACKGROUND", (0, row_idx), (-1, row_idx), bg))
    t.setStyle(TableStyle(style))
    return t


def info_box(text, bg=BG_LIGHT, border_color=INDIGO, style_name="Body"):
    """Paragraph wrapped in a single-cell table to simulate a box."""
    styles = base_styles()
    p = Paragraph(text, styles[style_name])
    t = Table([[p]], colWidths=[W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, -1), bg),
        ("BOX",          (0, 0), (-1, -1), 1, border_color),
        ("LEFTPADDING",  (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING",   (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 7),
    ]))
    return t


def section_label(text, color=INDIGO):
    styles = base_styles()
    p = Paragraph(f"<font color='#{color.hexval()[2:]}' size='9'><b>{text}</b></font>", styles["Body"])
    return p


def blank_line_rows(n):
    """Return n rows that are just underlined blanks."""
    rows = []
    for _ in range(n):
        rows.append(["_" * 60])
    return rows


def doc_for(filename, tool_name, category, on_page=None):
    path = os.path.join(OUTPUT_DIR, filename)
    if on_page is None:
        on_page = make_page_template(tool_name, category)
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN + 28, bottomMargin=MARGIN + 14,
        title=tool_name, author="Akash Jindal",
    )
    doc._page_callback = on_page
    return doc, path


def build_doc(doc, story):
    doc.build(story, onFirstPage=doc._page_callback, onLaterPages=doc._page_callback)


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 1 — MoSCoW Prioritisation
# ══════════════════════════════════════════════════════════════════════════════
def gen_moscow():
    doc, path = doc_for("moscow-prioritisation.pdf",
                         "MoSCoW Prioritisation Framework", "Prioritisation")
    styles = base_styles()
    story = []

    desc = ("Use MoSCoW to categorise every feature or requirement into four buckets. "
            "Complete the table below, then assign each item to a quadrant.")
    story.append(info_box(desc))
    story.append(Spacer(1, 8))

    # Input table
    story.append(Paragraph("<b>Feature / Requirement Input Table</b>", styles["SectionHead"]))
    header = ["Feature / Requirement", "Category (M/S/C/W)", "Owner", "Notes"]
    rows = [[""] * 4 for _ in range(8)]
    cw = [(W - 2*MARGIN) * f for f in [0.40, 0.18, 0.18, 0.24]]
    t = build_table(header, rows, cw)
    story.append(t)
    story.append(Spacer(1, 10))

    # 2x2 quadrant grid
    story.append(Paragraph("<b>MoSCoW Quadrant Map</b>", styles["SectionHead"]))
    blank = "\n".join(["_" * 28] * 5)

    def quad(label, color, bg):
        inner = [
            [Paragraph(f"<b><font color='white'> {label} </font></b>",
                       ParagraphStyle("q", fontName="Helvetica-Bold", fontSize=9,
                                      textColor=WHITE))],
            [Paragraph(blank, ParagraphStyle("ql", fontName="Helvetica", fontSize=8,
                                              leading=14, textColor=GRAY))],
        ]
        t = Table(inner, colWidths=[(W - 2*MARGIN)/2 - 3])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), color),
            ("BACKGROUND", (0, 1), (-1, 1), bg),
            ("BOX",        (0, 0), (-1, -1), 0.8, color),
            ("TOPPADDING",  (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING",(0,0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ]))
        return t

    qw = (W - 2*MARGIN)/2 - 3
    grid = Table([
        [quad("M — Must Have", EMERALD, GREEN_LIGHT),
         quad("S — Should Have", INDIGO, BLUE_LIGHT)],
        [quad("C — Could Have", AMBER, YELLOW_LIGHT),
         quad("W — Won't Have", RED, RED_LIGHT)],
    ], colWidths=[qw + 3, qw + 3], rowHeights=[130, 130])
    grid.setStyle(TableStyle([("LEFTPADDING", (0,0), (-1,-1), 3),
                               ("RIGHTPADDING",(0,0),(-1,-1), 3),
                               ("TOPPADDING",  (0,0),(-1,-1), 3),
                               ("BOTTOMPADDING",(0,0),(-1,-1),3)]))
    story.append(grid)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 2 — RICE Scoring
# ══════════════════════════════════════════════════════════════════════════════
def gen_rice():
    doc, path = doc_for("rice-scoring.pdf", "RICE Scoring Template", "Prioritisation")
    styles = base_styles()
    story = []

    formula = ("<b>RICE Score = (Reach × Impact × Confidence) ÷ Effort</b><br/>"
               "<font size='8'>• Reach: number of users affected per quarter<br/>"
               "• Impact: 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal<br/>"
               "• Confidence: 100% = High, 80% = Medium, 50% = Low<br/>"
               "• Effort: person-months required</font>")
    story.append(info_box(formula))
    story.append(Spacer(1, 10))

    header = ["Initiative", "Reach", "Impact", "Confidence %", "Effort", "RICE Score", "Priority"]
    rows = [[""] * 7 for _ in range(10)]
    total = W - 2 * MARGIN
    cw = [total * f for f in [0.30, 0.10, 0.10, 0.13, 0.10, 0.14, 0.13]]
    story.append(build_table(header, rows, cw))
    story.append(Spacer(1, 8))
    story.append(info_box("Sort by RICE Score descending to reveal true priorities.", YELLOW_LIGHT, AMBER, "Note"))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 3 — Impact-Effort Matrix
# ══════════════════════════════════════════════════════════════════════════════
def gen_impact_effort():
    doc, path = doc_for("impact-effort-matrix.pdf", "Impact-Effort Matrix", "Prioritisation")
    styles = base_styles()
    story = []

    blank = "\n".join(["_" * 26] * 4)

    def cell(label, bg):
        inner = [[Paragraph(f"<b>{label}</b>",
                             ParagraphStyle("cl", fontName="Helvetica-Bold", fontSize=9,
                                             textColor=BLACK))],
                  [Paragraph(blank, ParagraphStyle("cl2", fontName="Helvetica", fontSize=8,
                                                    leading=14, textColor=GRAY))]]
        t = Table(inner, colWidths=[(W - 2*MARGIN)/2 - 3])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), bg),
            ("BOX",        (0, 0), (-1, -1), 0.8, GRAY_LIGHT),
            ("TOPPADDING",  (0,0), (-1,-1), 6),
            ("BOTTOMPADDING",(0,0),(-1,-1),10),
            ("LEFTPADDING", (0,0), (-1,-1), 8),
        ]))
        return t

    # Axis labels
    story.append(Paragraph("<b>IMPACT</b> (High ↑ top, Low ↓ bottom)  |  "
                            "<b>EFFORT</b> (Low ← left, High → right)",
                            ParagraphStyle("ax", fontName="Helvetica-Bold", fontSize=8,
                                            textColor=GRAY, spaceAfter=4)))

    qw = (W - 2*MARGIN)/2 - 3
    grid = Table([
        [cell("⚡ Quick Wins\nHigh Impact · Low Effort", GREEN_LIGHT),
         cell("🎯 Big Bets\nHigh Impact · High Effort", BLUE_LIGHT)],
        [cell("📝 Fill-ins\nLow Impact · Low Effort", YELLOW_LIGHT),
         cell("🚫 Money Pit\nLow Impact · High Effort", RED_LIGHT)],
    ], colWidths=[qw + 3, qw + 3], rowHeights=[135, 135])
    grid.setStyle(TableStyle([("LEFTPADDING", (0,0),(-1,-1), 3),
                               ("RIGHTPADDING",(0,0),(-1,-1),3),
                               ("TOPPADDING",  (0,0),(-1,-1),3),
                               ("BOTTOMPADDING",(0,0),(-1,-1),3)]))
    story.append(grid)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Classification Guide</b>", styles["SectionHead"]))
    guide_header = ["Quadrant", "Action", "When to use"]
    guide_rows = [
        ["⚡ Quick Wins", "Do first", "High impact, low effort — schedule immediately"],
        ["🎯 Big Bets",   "Plan carefully", "High impact, high effort — needs resourcing"],
        ["📝 Fill-ins",   "Do if time allows", "Low impact, low effort — backlog filler"],
        ["🚫 Money Pit",  "Avoid / defer", "Low impact, high effort — challenge the ask"],
    ]
    total = W - 2 * MARGIN
    story.append(build_table(guide_header, guide_rows, [total*0.2, total*0.2, total*0.6]))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 4 — User Story Template
# ══════════════════════════════════════════════════════════════════════════════
def gen_user_story():
    doc, path = doc_for("user-story-kit.pdf", "User Story Kit", "Discovery")
    styles = base_styles()
    story = []

    def story_card():
        lines = [
            ["AS A:", "_" * 55],
            ["I WANT TO:", "_" * 55],
            ["SO THAT:", "_" * 55],
        ]
        fields = Table(lines, colWidths=[60, W - 2*MARGIN - 60])
        fields.setStyle(TableStyle([
            ("FONTNAME",    (0,0), (0,-1), "Helvetica-Bold"),
            ("FONTNAME",    (1,0), (1,-1), "Helvetica"),
            ("FONTSIZE",    (0,0), (-1,-1), 8.5),
            ("TEXTCOLOR",   (0,0), (0,-1), INDIGO),
            ("TOPPADDING",  (0,0), (-1,-1), 6),
            ("BOTTOMPADDING",(0,0),(-1,-1),6),
            ("LINEBEFORE",  (0,0), (0,-1), 2, INDIGO),
            ("LEFTPADDING", (0,0), (-1,-1), 6),
        ]))

        ac_header = [Paragraph("<b>Acceptance Criteria</b>", styles["SmallBold"])]
        ac_rows = [["□  " + "_" * 52] for _ in range(3)]
        ac = Table([ac_header] + ac_rows, colWidths=[W - 2*MARGIN])
        ac.setStyle(TableStyle([
            ("FONTNAME",   (0,0), (-1,-1), "Helvetica"),
            ("FONTSIZE",   (0,0), (-1,-1), 8.5),
            ("TOPPADDING", (0,0), (-1,-1), 4),
            ("BOTTOMPADDING",(0,0),(-1,-1),4),
            ("LEFTPADDING",(0,0),(-1,-1), 8),
            ("BACKGROUND", (0,0), (-1,0), BG_LIGHT),
        ]))

        meta_data = [["Story Points: ___", "Priority: ___", "Sprint: ___", "Epic: ___"]]
        meta = Table(meta_data, colWidths=[(W - 2*MARGIN)/4]*4)
        meta.setStyle(TableStyle([
            ("FONTNAME",  (0,0),(-1,-1),"Helvetica"),
            ("FONTSIZE",  (0,0),(-1,-1), 8),
            ("TEXTCOLOR", (0,0),(-1,-1), GRAY),
            ("TOPPADDING",(0,0),(-1,-1), 5),
            ("BOTTOMPADDING",(0,0),(-1,-1),5),
            ("GRID",      (0,0),(-1,-1), 0.3, GRAY_LIGHT),
            ("LEFTPADDING",(0,0),(-1,-1),6),
        ]))

        card_inner = [[fields], [ac], [meta]]
        card = Table(card_inner, colWidths=[W - 2*MARGIN])
        card.setStyle(TableStyle([
            ("BOX",         (0,0),(-1,-1), 1, INDIGO),
            ("LEFTPADDING", (0,0),(-1,-1), 0),
            ("RIGHTPADDING",(0,0),(-1,-1), 0),
            ("TOPPADDING",  (0,0),(-1,-1), 0),
            ("BOTTOMPADDING",(0,0),(-1,-1),0),
            ("ROUNDEDCORNERS", [4]),
        ]))
        return card

    for i in range(3):
        story.append(story_card())
        if i < 2:
            story.append(Spacer(1, 10))

    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 5 — JTBD Canvas
# ══════════════════════════════════════════════════════════════════════════════
def gen_jtbd():
    doc, path = doc_for("jtbd-canvas.pdf", "Jobs To Be Done (JTBD) Canvas", "Discovery")
    styles = base_styles()
    story = []

    def box(title, lines_n, bg=BG_LIGHT, title_color=INDIGO):
        content = [
            [Paragraph(f"<b><font color='#{title_color.hexval()[2:]}'>{title}</font></b>",
                        styles["SmallBold"])],
        ]
        for _ in range(lines_n):
            content.append([Paragraph("_" * 50, styles["Small"])])
        t = Table(content, colWidths=[None])
        t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(-1,-1), bg),
            ("TOPPADDING",    (0,0),(-1,-1), 5),
            ("BOTTOMPADDING", (0,0),(-1,-1), 5),
            ("LEFTPADDING",   (0,0),(-1,-1), 8),
            ("BOX",           (0,0),(-1,-1), 0.8, GRAY_LIGHT),
        ]))
        return t

    half = (W - 2*MARGIN) / 2 - 3
    full = W - 2*MARGIN

    # Row 1 — The Job (full width 3-part)
    job_inner = [
        [Paragraph("<b>When I…</b>", styles["SmallBold"]),
         Paragraph("_" * 60, styles["Small"])],
        [Paragraph("<b>I want to…</b>", styles["SmallBold"]),
         Paragraph("_" * 60, styles["Small"])],
        [Paragraph("<b>So I can…</b>", styles["SmallBold"]),
         Paragraph("_" * 60, styles["Small"])],
    ]
    job_t = Table(job_inner, colWidths=[70, full - 70])
    job_t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 1, INDIGO),
        ("FONTNAME",      (0,0),(0,-1), "Helvetica-Bold"),
        ("FONTSIZE",      (0,0),(-1,-1), 8.5),
        ("TOPPADDING",    (0,0),(-1,-1), 7),
        ("BOTTOMPADDING", (0,0),(-1,-1), 7),
        ("LEFTPADDING",   (0,0),(-1,-1), 8),
    ]))
    story.append(Paragraph("<b>The Job Statement</b>", styles["SectionHead"]))
    story.append(job_t)
    story.append(Spacer(1, 6))

    # Row 2 — Pain / Gain
    pg_row = Table(
        [[box("Pain Points", 4, RED_LIGHT, RED), box("Gain Creators", 4, GREEN_LIGHT, EMERALD)]],
        colWidths=[half + 3, half + 3]
    )
    pg_row.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),3),
                                 ("RIGHTPADDING",(0,0),(-1,-1),3)]))
    story.append(pg_row)
    story.append(Spacer(1, 6))

    # Row 3 — Current / Your Solution
    sol_row = Table(
        [[box("Current Solutions", 3), box("Your Solution", 3, BLUE_LIGHT, INDIGO)]],
        colWidths=[half + 3, half + 3]
    )
    sol_row.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),3),
                                  ("RIGHTPADDING",(0,0),(-1,-1),3)]))
    story.append(sol_row)
    story.append(Spacer(1, 6))

    # Row 4 — Success Metric
    metric_inner = [[Paragraph("<b>Success Metric:</b>", styles["SmallBold"]),
                     Paragraph("_" * 70, styles["Small"])]]
    metric_t = Table(metric_inner, colWidths=[100, full - 100])
    metric_t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0),(-1,-1), YELLOW_LIGHT),
        ("BOX",          (0,0),(-1,-1), 1, AMBER),
        ("TOPPADDING",   (0,0),(-1,-1), 8),
        ("BOTTOMPADDING",(0,0),(-1,-1), 8),
        ("LEFTPADDING",  (0,0),(-1,-1), 8),
    ]))
    story.append(metric_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 6 — Product Vision Board
# ══════════════════════════════════════════════════════════════════════════════
def gen_vision_board():
    doc, path = doc_for("product-vision-board.pdf", "Product Vision Board", "Strategy")
    styles = base_styles()
    story = []

    full = W - 2*MARGIN

    def tall_box(title, subtitle, lines_n, bg=BG_LIGHT, border=INDIGO, height=None):
        content = [Paragraph(f"<b>{title}</b>", styles["SectionHead"])]
        if subtitle:
            content.append(Paragraph(subtitle, styles["Small"]))
        for _ in range(lines_n):
            content.append(Paragraph("_" * 55, styles["Small"]))
        inner = [[c] for c in content]
        t = Table(inner, colWidths=[None])
        style_cmds = [
            ("BACKGROUND",    (0,0),(-1,-1), bg),
            ("BOX",           (0,0),(-1,-1), 1.2, border),
            ("TOPPADDING",    (0,0),(-1,-1), 7),
            ("BOTTOMPADDING", (0,0),(-1,-1), 7),
            ("LEFTPADDING",   (0,0),(-1,-1), 10),
            ("RIGHTPADDING",  (0,0),(-1,-1), 10),
        ]
        if height:
            pass  # rowHeights handled at outer table level
        t.setStyle(TableStyle(style_cmds))
        return t

    # Vision (full width)
    vision_inner = [
        [Paragraph("<b>VISION</b>", ParagraphStyle("vh", fontName="Helvetica-Bold",
                   fontSize=11, textColor=WHITE))],
        [Paragraph("What positive change does the product create?",
                    ParagraphStyle("vs", fontName="Helvetica-Oblique", fontSize=8,
                                   textColor=colors.HexColor("#C4B5FD")))],
    ] + [[Paragraph("_" * 65, styles["Small"])]] * 3
    vision_t = Table(vision_inner, colWidths=[full])
    vision_t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), INDIGO),
        ("TOPPADDING",    (0,0),(-1,-1), 8),
        ("BOTTOMPADDING", (0,0),(-1,-1), 8),
        ("LEFTPADDING",   (0,0),(-1,-1), 12),
        ("TEXTCOLOR",     (0,0),(-1,-1), WHITE),
    ]))
    story.append(vision_t)
    story.append(Spacer(1, 8))

    # 4 equal columns
    q = (full - 9) / 4
    cols = [
        ("TARGET GROUP", "Who are the target users\nand customers?", 4, BG_LIGHT, INDIGO),
        ("NEEDS", "What problems does it solve?\nWhat benefits?", 4, GREEN_LIGHT, EMERALD),
        ("PRODUCT", "Key features that\nmake it stand out.", 4, BLUE_LIGHT, BLUE),
        ("BUSINESS GOALS", "How does the product\nbenefit the company?", 4, YELLOW_LIGHT, AMBER),
    ]
    cells = []
    for title, sub, n, bg, border in cols:
        rows = [[Paragraph(f"<b>{title}</b>",
                            ParagraphStyle("ct", fontName="Helvetica-Bold", fontSize=8.5,
                                            textColor=border))],
                 [Paragraph(sub, ParagraphStyle("cs", fontName="Helvetica-Oblique",
                                                fontSize=7.5, textColor=GRAY, leading=11))]]
        for _ in range(n):
            rows.append([Paragraph("_" * 22, styles["Small"])])
        inner_t = Table(rows, colWidths=[q])
        inner_t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(-1,-1), bg),
            ("BOX",           (0,0),(-1,-1), 1, border),
            ("TOPPADDING",    (0,0),(-1,-1), 6),
            ("BOTTOMPADDING", (0,0),(-1,-1), 6),
            ("LEFTPADDING",   (0,0),(-1,-1), 7),
        ]))
        cells.append(inner_t)

    row_t = Table([cells], colWidths=[q + 3]*4)
    row_t.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),1),
                                ("RIGHTPADDING",(0,0),(-1,-1),1)]))
    story.append(row_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 7 — Now / Next / Later Roadmap
# ══════════════════════════════════════════════════════════════════════════════
def gen_roadmap():
    doc, path = doc_for("now-next-later-roadmap.pdf", "Now · Next · Later Roadmap", "Strategy")
    styles = base_styles()
    story = []

    story.append(info_box(
        "<b>Now</b> = This quarter  |  <b>Next</b> = Next 1–2 quarters  |  <b>Later</b> = 6+ months"
    ))
    story.append(Spacer(1, 8))

    full = W - 2*MARGIN
    col_w = (full - 6) / 3

    col_configs = [
        ("NOW", EMERALD),
        ("NEXT", INDIGO),
        ("LATER", AMBER),
    ]

    def roadmap_col(label, color):
        rows = [
            [Paragraph(f"<b>{label}</b>",
                        ParagraphStyle("rh", fontName="Helvetica-Bold", fontSize=11,
                                        textColor=WHITE, alignment=TA_CENTER))],
            [Paragraph("Theme / Goal: " + "_" * 20,
                        ParagraphStyle("rt", fontName="Helvetica", fontSize=8, textColor=GRAY))],
        ]
        for _ in range(5):
            rows += [
                [Paragraph("Feature: " + "_" * 24, styles["Small"])],
                [Paragraph("Outcome: " + "_" * 24, styles["Small"])],
                [Paragraph("Owner: " + "_" * 26, styles["Small"])],
                [HRFlowable(width=col_w - 14, thickness=0.4, color=GRAY_LIGHT,
                             spaceAfter=2, spaceBefore=2)],
            ]
        t = Table(rows, colWidths=[col_w])
        t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), color),
            ("BACKGROUND",    (0,1),(-1,-1), BG_LIGHT),
            ("BOX",           (0,0),(-1,-1), 1, color),
            ("TOPPADDING",    (0,0),(-1,-1), 4),
            ("BOTTOMPADDING", (0,0),(-1,-1), 4),
            ("LEFTPADDING",   (0,0),(-1,-1), 7),
        ]))
        return t

    cols = [roadmap_col(l, c) for l, c in col_configs]
    grid = Table([cols], colWidths=[col_w + 2]*3)
    grid.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),2),
                               ("RIGHTPADDING",(0,0),(-1,-1),2)]))
    story.append(grid)
    story.append(Spacer(1, 8))
    story.append(info_box("Confidence reduces left → right. Update quarterly.", YELLOW_LIGHT, AMBER, "Note"))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 8 — PRD Template
# ══════════════════════════════════════════════════════════════════════════════
def gen_prd():
    doc, path = doc_for("prd-one-pager.pdf", "Product Requirements Document (1-Pager)", "Strategy")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    def section(title, lines_n=None, table_data=None, table_cols=None):
        header_row = [[Paragraph(f"<b>{title}</b>",
                                  ParagraphStyle("sh", fontName="Helvetica-Bold", fontSize=8.5,
                                                  textColor=WHITE))]]
        rows = [header_row[0]]
        if lines_n:
            for _ in range(lines_n):
                rows.append([Paragraph("_" * 75, styles["Small"])])
        if table_data and table_cols:
            sub_header = [Paragraph(f"<b>{h}</b>", styles["SmallBold"]) for h in table_data[0]]
            sub_rows = [sub_header]
            for r in table_data[1:]:
                sub_rows.append([Paragraph(c, styles["Small"]) for c in r])
            sub_t = Table(sub_rows, colWidths=table_cols)
            sub_t.setStyle(TableStyle([
                ("BACKGROUND", (0,0),(-1,0), GRAY_LIGHT),
                ("GRID",       (0,0),(-1,-1), 0.4, GRAY_LIGHT),
                ("FONTSIZE",   (0,0),(-1,-1), 8),
                ("TOPPADDING", (0,0),(-1,-1), 4),
                ("BOTTOMPADDING",(0,0),(-1,-1),4),
                ("LEFTPADDING",(0,0),(-1,-1), 5),
            ]))
            rows.append([sub_t])
        outer = Table(rows, colWidths=[full])
        outer.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), INDIGO),
            ("BACKGROUND",    (0,1),(-1,-1), BG_LIGHT),
            ("BOX",           (0,0),(-1,-1), 0.8, INDIGO),
            ("TOPPADDING",    (0,0),(-1,-1), 5),
            ("BOTTOMPADDING", (0,0),(-1,-1), 5),
            ("LEFTPADDING",   (0,0),(-1,-1), 8),
        ]))
        return outer

    story.append(section("1. Problem Statement", lines_n=3))
    story.append(Spacer(1, 5))
    story.append(section("2. Target User", lines_n=2))
    story.append(Spacer(1, 5))
    story.append(section("3. Success Metrics",
                          table_data=[["Metric", "Current", "Target", "Timeline"],
                                      *[["", "", "", ""] for _ in range(4)]],
                          table_cols=[full*0.35, full*0.2, full*0.2, full*0.25]))
    story.append(Spacer(1, 5))
    story.append(section("4. Proposed Solution", lines_n=3))
    story.append(Spacer(1, 5))
    story.append(section("5. Out of Scope", lines_n=2))
    story.append(Spacer(1, 5))
    story.append(section("6. Dependencies",
                          table_data=[["Dependency", "Owner", "Date"],
                                      *[["", "", ""] for _ in range(3)]],
                          table_cols=[full*0.55, full*0.25, full*0.20]))
    story.append(Spacer(1, 5))
    story.append(section("7. Open Questions", lines_n=4))
    story.append(Spacer(1, 5))
    story.append(section("8. Sign-off",
                          table_data=[["Role", "Name", "Date", "Signature"],
                                      ["PM", "", "", ""],
                                      ["Engineering", "", "", ""],
                                      ["Design", "", "", ""],
                                      ["Stakeholder", "", "", ""]],
                          table_cols=[full*0.20, full*0.25, full*0.20, full*0.35]))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 9 — OKR Planning
# ══════════════════════════════════════════════════════════════════════════════
def gen_okr():
    doc, path = doc_for("okr-planning.pdf", "OKR Planning Template", "Strategy")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    story.append(info_box(
        "<b>1 Objective</b> = 1 inspiring qualitative goal.  "
        "<b>3–5 Key Results</b> = measurable outcomes, not outputs."
    ))
    story.append(Spacer(1, 8))

    def okr_block():
        # Objective header
        obj_rows = [
            [Paragraph("<b>OBJECTIVE:</b>", styles["SectionHead"]),
             Paragraph("_" * 45, styles["Small"])],
            [Paragraph("Quarter: ___  |  Owner: ___  |  Team: ___", styles["Small"]), ""],
        ]
        obj_t = Table(obj_rows, colWidths=[85, full - 85])
        obj_t.setStyle(TableStyle([
            ("BACKGROUND",  (0,0),(-1,-1), BG_LIGHT),
            ("BOX",         (0,0),(-1,-1), 1.5, INDIGO),
            ("SPAN",        (0,1),(1,1)),
            ("TOPPADDING",  (0,0),(-1,-1), 6),
            ("BOTTOMPADDING",(0,0),(-1,-1),6),
            ("LEFTPADDING", (0,0),(-1,-1), 8),
        ]))

        # KR table
        kr_header = ["#", "Key Result", "Baseline", "Target", "Owner", "Progress %"]
        kr_rows = [["KR1", "", "", "", "", ""],
                    ["KR2", "", "", "", "", ""],
                    ["KR3", "", "", "", "", ""]]
        kr_t = build_table(kr_header, kr_rows,
                            [full*f for f in [0.06, 0.35, 0.14, 0.14, 0.16, 0.15]],
                            header_color=colors.HexColor("#818CF8"))

        # Initiatives
        init_rows = [["Initiatives / Projects linked to this objective:"]]
        init_rows.append(["□ " + "_"*22 + "   □ " + "_"*22 + "   □ " + "_"*22])
        init_t = Table(init_rows, colWidths=[full])
        init_t.setStyle(TableStyle([
            ("FONTNAME",    (0,0),(-1,-1), "Helvetica"),
            ("FONTSIZE",    (0,0),(-1,-1), 8),
            ("TOPPADDING",  (0,0),(-1,-1), 5),
            ("BOTTOMPADDING",(0,0),(-1,-1),5),
            ("LEFTPADDING", (0,0),(-1,-1), 8),
            ("BACKGROUND",  (0,0),(-1,-1), WHITE),
            ("BOX",         (0,0),(-1,-1), 0.6, GRAY_LIGHT),
        ]))

        wrapper = Table([[obj_t], [kr_t], [init_t]], colWidths=[full])
        wrapper.setStyle(TableStyle([
            ("BOX",         (0,0),(-1,-1), 1, INDIGO),
            ("TOPPADDING",  (0,0),(-1,-1), 0),
            ("BOTTOMPADDING",(0,0),(-1,-1),0),
            ("LEFTPADDING", (0,0),(-1,-1), 0),
            ("RIGHTPADDING",(0,0),(-1,-1), 0),
        ]))
        return wrapper

    story.append(okr_block())
    story.append(Spacer(1, 12))
    story.append(okr_block())
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 10 — Stakeholder Map
# ══════════════════════════════════════════════════════════════════════════════
def gen_stakeholder():
    doc, path = doc_for("stakeholder-map.pdf", "Stakeholder Map & Comms Plan", "Stakeholders")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    blank4 = "\n".join(["_" * 24] * 4)

    def sq(label, action, bg):
        rows = [
            [Paragraph(f"<b>{label}</b>",
                        ParagraphStyle("sq", fontName="Helvetica-Bold", fontSize=9, textColor=WHITE))],
            [Paragraph(f"<i>{action}</i>",
                        ParagraphStyle("sa", fontName="Helvetica-Oblique", fontSize=7.5,
                                        textColor=colors.HexColor("#E0E7FF")))],
            [Paragraph(blank4, ParagraphStyle("sl", fontName="Helvetica", fontSize=8,
                                               leading=14, textColor=GRAY))],
        ]
        t = Table(rows, colWidths=[(full-6)/2])
        t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,1), bg),
            ("BACKGROUND",    (0,2),(-1,-1), BG_LIGHT),
            ("BOX",           (0,0),(-1,-1), 1, bg),
            ("TOPPADDING",    (0,0),(-1,-1), 6),
            ("BOTTOMPADDING", (0,0),(-1,-1), 6),
            ("LEFTPADDING",   (0,0),(-1,-1), 8),
        ]))
        return t

    # Axis labels
    story.append(Paragraph(
        "<b>POWER</b> (High ↑ top / Low ↓ bottom)  |  <b>INTEREST</b> (Low ← left / High → right)",
        ParagraphStyle("ax", fontName="Helvetica-Bold", fontSize=8, textColor=GRAY, spaceAfter=4)
    ))
    qw = (full - 6) / 2
    grid = Table([
        [sq("High Power · High Interest", "Manage Closely", INDIGO),
         sq("High Power · Low Interest",  "Keep Satisfied", PURPLE)],
        [sq("Low Power · High Interest",  "Keep Informed",  EMERALD),
         sq("Low Power · Low Interest",   "Monitor",        AMBER)],
    ], colWidths=[qw + 3]*2, rowHeights=[120]*2)
    grid.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),2),
                               ("RIGHTPADDING",(0,0),(-1,-1),2),
                               ("TOPPADDING",(0,0),(-1,-1),2),
                               ("BOTTOMPADDING",(0,0),(-1,-1),2)]))
    story.append(grid)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Stakeholder Communications Plan</b>", styles["SectionHead"]))
    header = ["Stakeholder", "Role", "Power", "Interest", "Comms Freq.", "Channel", "Owner"]
    rows = [[""] * 7 for _ in range(8)]
    story.append(build_table(header, rows,
                              [full*f for f in [0.20, 0.15, 0.08, 0.09, 0.13, 0.20, 0.15]]))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 11 — Sprint Planning
# ══════════════════════════════════════════════════════════════════════════════
def gen_sprint():
    doc, path = doc_for("sprint-planning.pdf", "Sprint Planning Template", "Delivery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    sprint_data = [
        ["Sprint #: ___   Dates: ___________ to ___________   Team: _______________"],
        ["Sprint Goal: " + "_" * 62],
        ["Definition of Done: " + "_" * 55],
        ["Velocity Target: ___ story points"],
    ]
    sprint_t = Table(sprint_data, colWidths=[full])
    sprint_t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 1.5, INDIGO),
        ("FONTNAME",      (0,0),(-1,-1), "Helvetica"),
        ("FONTSIZE",      (0,0),(-1,-1), 8.5),
        ("TOPPADDING",    (0,0),(-1,-1), 6),
        ("BOTTOMPADDING", (0,0),(-1,-1), 6),
        ("LEFTPADDING",   (0,0),(-1,-1), 10),
    ]))
    story.append(sprint_t)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Sprint Backlog</b>", styles["SectionHead"]))
    header = ["#", "User Story", "SP", "Priority", "Assignee", "Status", "Notes"]
    rows = [[""] * 7 for _ in range(12)]
    story.append(build_table(header, rows,
                              [full*f for f in [0.04, 0.30, 0.06, 0.10, 0.14, 0.12, 0.24]]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Team Capacity</b>", styles["SectionHead"]))
    cap_header = ["Team Member", "Available Days", "Capacity (SP)", "Focus Area"]
    cap_rows = [[""] * 4 for _ in range(5)]
    story.append(build_table(cap_header, cap_rows,
                              [full*f for f in [0.30, 0.20, 0.20, 0.30]]))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 12 — Retrospective
# ══════════════════════════════════════════════════════════════════════════════
def gen_retro():
    doc, path = doc_for("sprint-retrospective.pdf", "Sprint Retrospective Template", "Delivery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    cols_cfg = [
        ("😊 WENT WELL", EMERALD, GREEN_LIGHT),
        ("😕 IMPROVE",   RED, RED_LIGHT),
        ("💡 IDEAS",     AMBER, YELLOW_LIGHT),
        ("✅ ACTIONS",   INDIGO, BLUE_LIGHT),
    ]
    qw = (full - 9) / 4
    retro_cols = []
    for label, color, bg in cols_cfg:
        rows = [[Paragraph(f"<b>{label}</b>",
                            ParagraphStyle("rh", fontName="Helvetica-Bold", fontSize=8.5,
                                            textColor=WHITE, alignment=TA_CENTER))]]
        for i in range(8):
            rows.append([Paragraph("_" * 20, styles["Small"])])
            if (i + 1) % 2 == 0 and i < 7:
                rows.append([HRFlowable(width=qw - 12, thickness=0.3,
                                         color=GRAY_LIGHT, spaceAfter=1, spaceBefore=1)])
        col_t = Table(rows, colWidths=[qw])
        col_t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), color),
            ("BACKGROUND",    (0,1),(-1,-1), bg),
            ("BOX",           (0,0),(-1,-1), 0.8, color),
            ("TOPPADDING",    (0,0),(-1,-1), 4),
            ("BOTTOMPADDING", (0,0),(-1,-1), 4),
            ("LEFTPADDING",   (0,0),(-1,-1), 6),
        ]))
        retro_cols.append(col_t)

    board = Table([retro_cols], colWidths=[qw + 3]*4)
    board.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),1),
                                ("RIGHTPADDING",(0,0),(-1,-1),1)]))
    story.append(board)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Action Items</b>", styles["SectionHead"]))
    header = ["Action", "Owner", "Due Date", "Priority", "Status"]
    rows = [[""] * 5 for _ in range(6)]
    story.append(build_table(header, rows,
                              [full*f for f in [0.40, 0.15, 0.15, 0.15, 0.15]]))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 13 — GTM Launch Checklist
# ══════════════════════════════════════════════════════════════════════════════
def gen_gtm():
    doc, path = doc_for("gtm-launch-checklist.pdf", "Go-To-Market Launch Checklist", "Delivery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    phases = [
        ("Phase 1 — Define (4 weeks before)", INDIGO, [
            "Problem statement signed off",
            "Target segment defined",
            "Pricing model confirmed",
            "Success metrics agreed",
            "Launch date set",
        ]),
        ("Phase 2 — Build (3 weeks before)", EMERALD, [
            "Feature complete (code freeze)",
            "QA sign-off",
            "Legal / compliance review",
            "Data tracking implemented",
            "Internal demo done",
        ]),
        ("Phase 3 — Enable (2 weeks before)", AMBER, [
            "Sales / CS trained",
            "Help docs written",
            "Marketing assets ready (email, social, blog)",
            "Beta feedback incorporated",
            "Rollback plan documented",
        ]),
        ("Phase 4 — Launch (Launch week)", RED, [
            "Feature flagged on for 10% → 50% → 100%",
            "Announcement sent",
            "Support team briefed",
            "Monitoring dashboards live",
            "Stakeholder comms sent",
        ]),
        ("Phase 5 — Review (1 week after)", PURPLE, [
            "Metrics vs targets reviewed",
            "User feedback collected",
            "Bugs triaged",
            "Retro held",
            "Next iteration planned",
        ]),
    ]

    for phase_name, color, items in phases:
        phase_rows = [
            [Paragraph(f"<b>{phase_name}</b>",
                        ParagraphStyle("ph", fontName="Helvetica-Bold", fontSize=9,
                                        textColor=WHITE))],
        ]
        for item in items:
            phase_rows.append([Paragraph(f"□  {item}",
                                          ParagraphStyle("pi", fontName="Helvetica",
                                                          fontSize=8.5, textColor=BLACK))])
        t = Table(phase_rows, colWidths=[full])
        t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), color),
            ("BACKGROUND",    (0,1),(-1,-1), BG_LIGHT),
            ("LINEBEFORE",    (0,1),(-1,-1), 3, color),
            ("TOPPADDING",    (0,0),(-1,-1), 6),
            ("BOTTOMPADDING", (0,0),(-1,-1), 6),
            ("LEFTPADDING",   (0,0),(-1,-1), 10),
            ("BOX",           (0,0),(-1,-1), 0.5, GRAY_LIGHT),
        ]))
        story.append(t)
        story.append(Spacer(1, 6))

    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 14 — North Star Metrics
# ══════════════════════════════════════════════════════════════════════════════
def gen_north_star():
    doc, path = doc_for("north-star-metrics.pdf", "North Star Metrics Framework", "Metrics")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    # North Star box
    ns_rows = [
        [Paragraph("<b>NORTH STAR METRIC</b>",
                    ParagraphStyle("ns", fontName="Helvetica-Bold", fontSize=12, textColor=INDIGO))],
        [Paragraph("Metric name: " + "_"*40, styles["Body"])],
        [Paragraph("Current value: ___    Target: ___    Date: ___________", styles["Body"])],
        [Paragraph("Definition: " + "_"*50, styles["Small"])],
    ]
    ns_t = Table(ns_rows, colWidths=[full])
    ns_t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 2, INDIGO),
        ("TOPPADDING",    (0,0),(-1,-1), 7),
        ("BOTTOMPADDING", (0,0),(-1,-1), 7),
        ("LEFTPADDING",   (0,0),(-1,-1), 12),
    ]))
    story.append(ns_t)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Input Metrics (Leading Indicators)</b>", styles["SectionHead"]))
    col_labels = [("Acquisition", BLUE), ("Engagement", EMERALD), ("Retention", INDIGO)]
    col_w = (full - 6) / 3
    im_cols = []
    for label, color in col_labels:
        rows = [[Paragraph(f"<b>{label}</b>",
                            ParagraphStyle("iml", fontName="Helvetica-Bold", fontSize=9,
                                            textColor=WHITE, alignment=TA_CENTER))]]
        for _ in range(2):
            rows += [
                [Paragraph("Metric: " + "_"*18, styles["Small"])],
                [Paragraph("Current: ___   Target: ___", styles["Small"])],
            ]
        col_t = Table(rows, colWidths=[col_w])
        col_t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), color),
            ("BACKGROUND",    (0,1),(-1,-1), BG_LIGHT),
            ("BOX",           (0,0),(-1,-1), 0.8, color),
            ("TOPPADDING",    (0,0),(-1,-1), 5),
            ("BOTTOMPADDING", (0,0),(-1,-1), 5),
            ("LEFTPADDING",   (0,0),(-1,-1), 7),
        ]))
        im_cols.append(col_t)

    im_row = Table([im_cols], colWidths=[col_w + 3]*3)
    im_row.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),1),
                                 ("RIGHTPADDING",(0,0),(-1,-1),1)]))
    story.append(im_row)
    story.append(Spacer(1, 10))

    # Guard rails
    story.append(Paragraph("<b>Guard Rails — these must NOT worsen:</b>",
                            ParagraphStyle("gr", fontName="Helvetica-Bold", fontSize=9,
                                            textColor=RED)))
    gr_header = ["Metric", "Threshold", "Owner"]
    gr_rows = [["", "", ""] for _ in range(3)]
    guard_t = build_table(gr_header, gr_rows, [full*0.45, full*0.30, full*0.25],
                           header_color=RED)
    guard_t.setStyle(TableStyle([
        ("BOX", (0,0),(-1,-1), 1, RED),
    ]))
    story.append(guard_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 15 — AARRR Pirate Metrics
# ══════════════════════════════════════════════════════════════════════════════
def gen_aarrr():
    doc, path = doc_for("aarrr-pirate-metrics.pdf", "AARRR Pirate Metrics Template", "Metrics")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    story.append(info_box(
        "Map your full funnel — from first touch to revenue — and identify where you're losing users."
    ))
    story.append(Spacer(1, 8))

    stages = [
        ("ACQUISITION",  BLUE,   "How do users find you?",              "blue"),
        ("ACTIVATION",   EMERALD,"Do they have a great first experience?","green"),
        ("RETENTION",    AMBER,  "Do they come back?",                   "amber"),
        ("REFERRAL",     PURPLE, "Do they tell others?",                 "purple"),
        ("REVENUE",      RED,    "Do they pay?",                         "red"),
    ]
    header = ["Stage", "Definition", "Current Metric", "Target", "Key Lever", "Owner"]
    rows_data = []
    for i, (stage, color, defn, _) in enumerate(stages):
        rows_data.append([stage, defn, "", "", "", ""])

    all_rows = [header] + rows_data
    cw = [full*f for f in [0.14, 0.24, 0.15, 0.12, 0.20, 0.15]]
    t = Table(all_rows, colWidths=cw, repeatRows=1)
    style_cmds = [
        ("BACKGROUND",   (0,0),(-1,0), INDIGO),
        ("TEXTCOLOR",    (0,0),(-1,0), WHITE),
        ("FONTNAME",     (0,0),(-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0),(-1,0), 8),
        ("ALIGN",        (0,0),(-1,-1), "LEFT"),
        ("VALIGN",       (0,0),(-1,-1), "MIDDLE"),
        ("FONTNAME",     (0,1),(-1,-1), "Helvetica"),
        ("FONTSIZE",     (0,1),(-1,-1), 8),
        ("GRID",         (0,0),(-1,-1), 0.4, GRAY_LIGHT),
        ("LEFTPADDING",  (0,0),(-1,-1), 5),
        ("RIGHTPADDING", (0,0),(-1,-1), 5),
        ("TOPPADDING",   (0,0),(-1,-1), 8),
        ("BOTTOMPADDING",(0,0),(-1,-1), 8),
    ]
    colors_list = [c for _, c, _, _ in stages]
    for i, color in enumerate(colors_list):
        style_cmds.append(("BACKGROUND", (0, i+1), (0, i+1), color))
        style_cmds.append(("TEXTCOLOR",  (0, i+1), (0, i+1), WHITE))
        style_cmds.append(("FONTNAME",   (0, i+1), (0, i+1), "Helvetica-Bold"))
        bg = BG_LIGHT if i % 2 == 0 else WHITE
        style_cmds.append(("BACKGROUND", (1, i+1), (-1, i+1), bg))
    t.setStyle(TableStyle(style_cmds))
    story.append(t)
    story.append(Spacer(1, 8))

    # Conversion row
    conv_data = [["Acq→Act: ___%", "Act→Ret: ___%", "Ret→Rev: ___%", "Overall: ___%"]]
    conv_t = Table(conv_data, colWidths=[full/4]*4)
    conv_t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("GRID",          (0,0),(-1,-1), 0.4, GRAY_LIGHT),
        ("FONTNAME",      (0,0),(-1,-1), "Helvetica-Bold"),
        ("FONTSIZE",      (0,0),(-1,-1), 9),
        ("ALIGN",         (0,0),(-1,-1), "CENTER"),
        ("TOPPADDING",    (0,0),(-1,-1), 8),
        ("BOTTOMPADDING", (0,0),(-1,-1), 8),
    ]))
    story.append(conv_t)
    story.append(Spacer(1, 6))

    analysis = [
        ["Biggest leak:", "_" * 50],
        ["Next experiment:", "_" * 50],
    ]
    a_t = Table(analysis, colWidths=[90, full-90])
    a_t.setStyle(TableStyle([
        ("FONTNAME",    (0,0),(0,-1), "Helvetica-Bold"),
        ("FONTNAME",    (1,0),(1,-1), "Helvetica"),
        ("FONTSIZE",    (0,0),(-1,-1), 8.5),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING", (0,0),(-1,-1), 8),
    ]))
    story.append(a_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 16 — A/B Test Hypothesis
# ══════════════════════════════════════════════════════════════════════════════
def gen_ab_test():
    doc, path = doc_for("ab-test-hypothesis.pdf", "A/B Test Hypothesis Template", "Metrics")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    hyp_rows = [
        ["WE BELIEVE THAT:",      "_" * 52],
        ["WILL RESULT IN:",       "_" * 52],
        ["WE'LL KNOW THIS WORKS WHEN:", "_" * 46],
        ["CONFIDENCE LEVEL:",     "□ High   □ Medium   □ Low"],
    ]
    hyp_t = Table(hyp_rows, colWidths=[140, full-140])
    hyp_t.setStyle(TableStyle([
        ("FONTNAME",      (0,0),(0,-1), "Helvetica-Bold"),
        ("FONTNAME",      (1,0),(1,-1), "Helvetica"),
        ("FONTSIZE",      (0,0),(-1,-1), 9),
        ("TEXTCOLOR",     (0,0),(0,-1), INDIGO),
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 1.5, INDIGO),
        ("TOPPADDING",    (0,0),(-1,-1), 8),
        ("BOTTOMPADDING", (0,0),(-1,-1), 8),
        ("LEFTPADDING",   (0,0),(-1,-1), 10),
    ]))
    story.append(hyp_t)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Test Setup</b>", styles["SectionHead"]))
    setup_rows = [
        ["Control: " + "_"*26, "Variant: " + "_"*26],
        ["Sample size required: " + "_"*15, "Duration: " + "_"*22],
        ["Primary metric: " + "_"*19, "Secondary metric: " + "_"*16],
    ]
    s_t = Table(setup_rows, colWidths=[full/2]*2)
    s_t.setStyle(TableStyle([
        ("FONTNAME",      (0,0),(-1,-1), "Helvetica"),
        ("FONTSIZE",      (0,0),(-1,-1), 8.5),
        ("TOPPADDING",    (0,0),(-1,-1), 6),
        ("BOTTOMPADDING", (0,0),(-1,-1), 6),
        ("LEFTPADDING",   (0,0),(-1,-1), 8),
        ("GRID",          (0,0),(-1,-1), 0.3, GRAY_LIGHT),
    ]))
    story.append(s_t)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Results Log</b>", styles["SectionHead"]))
    header = ["Metric", "Control", "Variant", "Lift %", "Significant?", "Decision"]
    rows = [[""] * 6 for _ in range(4)]
    story.append(build_table(header, rows,
                              [full*f for f in [0.25, 0.14, 0.14, 0.12, 0.16, 0.19]]))
    story.append(Spacer(1, 8))

    outcome = [["Outcome:", "□ Ship   □ Iterate   □ Kill"]]
    outcome_t = Table(outcome, colWidths=[60, full-60])
    outcome_t.setStyle(TableStyle([
        ("FONTNAME",    (0,0),(0,-1), "Helvetica-Bold"),
        ("FONTNAME",    (1,0),(1,-1), "Helvetica"),
        ("FONTSIZE",    (0,0),(-1,-1), 9),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING", (0,0),(-1,-1), 8),
    ]))
    story.append(outcome_t)
    story.append(Spacer(1, 5))
    story.append(info_box("Learnings: " + "_" * 60, BG_LIGHT, EMERALD))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 17 — Decision Log
# ══════════════════════════════════════════════════════════════════════════════
def gen_decision_log():
    doc, path = doc_for("decision-log.pdf", "Product Decision Log", "Delivery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    story.append(info_box(
        "Log every significant product decision. This protects you in reviews and helps "
        "new team members understand context quickly."
    ))
    story.append(Spacer(1, 8))

    header = ["Date", "Decision", "Options Considered", "Rationale",
              "Owner", "Stakeholders Informed", "Revisit Date"]
    rows = [[""] * 7 for _ in range(10)]
    story.append(build_table(
        header, rows,
        [full*f for f in [0.08, 0.16, 0.18, 0.20, 0.10, 0.18, 0.10]],
    ))
    story.append(Spacer(1, 8))
    story.append(info_box("Review this log in every quarterly planning session.", YELLOW_LIGHT, AMBER, "Note"))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 18 — Feedback Synthesis
# ══════════════════════════════════════════════════════════════════════════════
def gen_feedback():
    doc, path = doc_for("feedback-synthesis.pdf", "User Feedback Synthesis Template", "Discovery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    # Header info
    meta_rows = [["Research round: ___", "Date: ___________", "Method: ___________", "Participants: ___"]]
    m_t = Table(meta_rows, colWidths=[full/4]*4)
    m_t.setStyle(TableStyle([
        ("FONTNAME",    (0,0),(-1,-1), "Helvetica"),
        ("FONTSIZE",    (0,0),(-1,-1), 8.5),
        ("BACKGROUND",  (0,0),(-1,-1), BG_LIGHT),
        ("GRID",        (0,0),(-1,-1), 0.4, GRAY_LIGHT),
        ("TOPPADDING",  (0,0),(-1,-1), 7),
        ("BOTTOMPADDING",(0,0),(-1,-1),7),
        ("LEFTPADDING", (0,0),(-1,-1), 8),
    ]))
    story.append(m_t)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Observation Log</b>", styles["SectionHead"]))
    header = ["#", "Raw Quote / Observation", "Theme", "Frequency (1-5)", "Severity", "Insight"]
    rows = [[""] * 6 for _ in range(10)]
    story.append(build_table(header, rows,
                              [full*f for f in [0.04, 0.30, 0.14, 0.13, 0.10, 0.29]]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Affinity Clusters</b>", styles["SectionHead"]))
    col_w = (full - 6) / 3
    cluster_cols = []
    for i in range(1, 4):
        rows_c = [[Paragraph(f"<b>Theme {i}: " + "_"*15 + "</b>", styles["SmallBold"])],
                   [Paragraph("<i>Supporting quotes:</i>", styles["Small"])]]
        for _ in range(3):
            rows_c.append([Paragraph("_" * 28, styles["Small"])])
        ct = Table(rows_c, colWidths=[col_w])
        ct.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
            ("BOX",           (0,0),(-1,-1), 0.6, INDIGO),
            ("TOPPADDING",    (0,0),(-1,-1), 5),
            ("BOTTOMPADDING", (0,0),(-1,-1), 5),
            ("LEFTPADDING",   (0,0),(-1,-1), 7),
        ]))
        cluster_cols.append(ct)

    cluster_row = Table([cluster_cols], colWidths=[col_w + 3]*3)
    cluster_row.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),1),
                                      ("RIGHTPADDING",(0,0),(-1,-1),1)]))
    story.append(cluster_row)
    story.append(Spacer(1, 8))

    findings = [
        [Paragraph("<b>Top 3 Findings</b>", styles["SectionHead"])],
        [Paragraph("1. " + "_"*70, styles["Body"])],
        [Paragraph("2. " + "_"*70, styles["Body"])],
        [Paragraph("3. " + "_"*70, styles["Body"])],
    ]
    f_t = Table(findings, colWidths=[full])
    f_t.setStyle(TableStyle([
        ("TOPPADDING",    (0,0),(-1,-1), 4),
        ("BOTTOMPADDING", (0,0),(-1,-1), 4),
        ("LEFTPADDING",   (0,0),(-1,-1), 5),
    ]))
    story.append(f_t)
    story.append(Spacer(1, 6))
    story.append(info_box(
        "Recommended next actions:<br/>□ " + "_"*22 + "   □ " + "_"*22 + "   □ " + "_"*22,
        BG_LIGHT, EMERALD
    ))
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 19 — Competitive Analysis
# ══════════════════════════════════════════════════════════════════════════════
def gen_competitive():
    doc, path = doc_for("competitive-analysis.pdf", "Competitive Analysis Canvas", "Discovery")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    ctx_rows = [["Our Product: " + "_"*25, "Analysis Date: ___________"],
                 ["Our Target User: " + "_"*22, "Analyst: ___________"]]
    ctx_t = Table(ctx_rows, colWidths=[full/2]*2)
    ctx_t.setStyle(TableStyle([
        ("FONTNAME",    (0,0),(-1,-1), "Helvetica"),
        ("FONTSIZE",    (0,0),(-1,-1), 8.5),
        ("BACKGROUND",  (0,0),(-1,-1), BG_LIGHT),
        ("GRID",        (0,0),(-1,-1), 0.4, GRAY_LIGHT),
        ("TOPPADDING",  (0,0),(-1,-1), 7),
        ("BOTTOMPADDING",(0,0),(-1,-1),7),
        ("LEFTPADDING", (0,0),(-1,-1), 8),
    ]))
    story.append(ctx_t)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Feature Comparison Matrix</b>", styles["SectionHead"]))
    prefilled = [
        "Core value proposition",
        "Pricing model",
        "Onboarding experience",
        "Key feature 1",
        "Key feature 2",
        "Performance / speed",
        "Mobile experience",
        "Customer support",
    ]
    header = ["Feature / Criteria", "Us", "Competitor A", "Competitor B", "Competitor C", "Notes"]
    data_rows = [[f, "", "", "", "", ""] for f in prefilled]
    data_rows += [["", "", "", "", "", ""] for _ in range(7)]
    story.append(build_table(header, data_rows,
                              [full*f for f in [0.28, 0.10, 0.13, 0.13, 0.13, 0.23]]))
    story.append(Spacer(1, 6))

    story.append(info_box("✅ Strong  ⚠️ Partial  ❌ Weak / Missing", BG_LIGHT, EMERALD))
    story.append(Spacer(1, 6))

    gaps = [["Strategic Gaps Identified:"],
             ["1. " + "_"*26 + "   2. " + "_"*26 + "   3. " + "_"*26]]
    g_t = Table(gaps, colWidths=[full])
    g_t.setStyle(TableStyle([
        ("FONTNAME",    (0,0),(0,0), "Helvetica-Bold"),
        ("FONTNAME",    (0,1),(0,1), "Helvetica"),
        ("FONTSIZE",    (0,0),(-1,-1), 8.5),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING", (0,0),(-1,-1), 5),
    ]))
    story.append(g_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# TOOL 20 — PM Interview Prep Kit
# ══════════════════════════════════════════════════════════════════════════════
def gen_interview():
    doc, path = doc_for("pm-interview-prep.pdf", "PM Interview Prep Kit", "Career")
    styles = base_styles()
    story = []
    full = W - 2*MARGIN

    story.append(Paragraph("<b>Section 1 — STAR Story Template</b>", styles["SectionHead"]))
    star_rows = [
        ["SITUATION",  "_" * 55, "(context — 2 lines)"],
        ["",           "_" * 55, ""],
        ["TASK",       "_" * 55, "(your responsibility — 2 lines)"],
        ["",           "_" * 55, ""],
        ["ACTION",     "_" * 55, "(what you did — 3 lines)"],
        ["",           "_" * 55, ""],
        ["",           "_" * 55, ""],
        ["RESULT",     "_" * 55, "(metrics — 2 lines)"],
        ["",           "_" * 55, ""],
        ["LEARNINGS",  "_" * 55, "(1 line)"],
    ]
    star_t = Table(star_rows, colWidths=[70, full - 70 - 110, 110])
    star_t.setStyle(TableStyle([
        ("FONTNAME",      (0,0),(0,-1), "Helvetica-Bold"),
        ("FONTNAME",      (1,0),(2,-1), "Helvetica"),
        ("FONTSIZE",      (0,0),(-1,-1), 8.5),
        ("TEXTCOLOR",     (0,0),(0,-1), INDIGO),
        ("TEXTCOLOR",     (2,0),(2,-1), GRAY),
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 1, INDIGO),
        ("LINEBEFORE",    (0,0),(0,-1), 3, INDIGO),
        ("TOPPADDING",    (0,0),(-1,-1), 5),
        ("BOTTOMPADDING", (0,0),(-1,-1), 5),
        ("LEFTPADDING",   (0,0),(-1,-1), 8),
    ]))
    story.append(star_t)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Section 2 — Question Bank</b>", styles["SectionHead"]))
    q_sections = [
        ("Product Design", INDIGO, ["□ Design Uber for X", "□ Improve Google Maps", "□ Build for elderly"]),
        ("Analytical",     EMERALD,["□ Estimate market size", "□ Analyse metric drop", "□ A/B test design"]),
        ("Strategy",       AMBER,  ["□ Enter new market", "□ Sunset a feature", "□ Prioritise 3 items"]),
        ("Behavioural",    RED,    ["□ Disagreed with eng", "□ Missed deadline", "□ Influenced w/o auth"]),
    ]
    qbank_cols = []
    qw = (full - 6) / 2
    for i, (title, color, qs) in enumerate(q_sections):
        rows = [[Paragraph(f"<b>{title}</b>",
                            ParagraphStyle("qh", fontName="Helvetica-Bold", fontSize=9, textColor=color))]]
        for q in qs:
            rows.append([Paragraph(q, styles["Body"])])
        col_t = Table(rows, colWidths=[qw])
        col_t.setStyle(TableStyle([
            ("BACKGROUND",    (0,0),(0,0), BG_LIGHT),
            ("LINEBEFORE",    (0,0),(0,-1), 3, color),
            ("TOPPADDING",    (0,0),(-1,-1), 5),
            ("BOTTOMPADDING", (0,0),(-1,-1), 5),
            ("LEFTPADDING",   (0,0),(-1,-1), 8),
            ("BOX",           (0,0),(-1,-1), 0.5, GRAY_LIGHT),
        ]))
        qbank_cols.append(col_t)

    qrow1 = Table([qbank_cols[:2]], colWidths=[qw + 3]*2)
    qrow2 = Table([qbank_cols[2:]], colWidths=[qw + 3]*2)
    for qrow in [qrow1, qrow2]:
        qrow.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),1),
                                   ("RIGHTPADDING",(0,0),(-1,-1),1)]))
    story.append(qrow1)
    story.append(Spacer(1, 5))
    story.append(qrow2)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Section 3 — Questions to Ask the Interviewer</b>", styles["SectionHead"]))
    ask_rows = [
        ["□ What does success look like in 90 days?"],
        ["□ What's the team's biggest challenge right now?"],
        ["□ How does PM work with Engineering here?"],
    ]
    ask_t = Table(ask_rows, colWidths=[full])
    ask_t.setStyle(TableStyle([
        ("FONTNAME",      (0,0),(-1,-1), "Helvetica"),
        ("FONTSIZE",      (0,0),(-1,-1), 8.5),
        ("BACKGROUND",    (0,0),(-1,-1), BG_LIGHT),
        ("BOX",           (0,0),(-1,-1), 1, INDIGO),
        ("LINEBEFORE",    (0,0),(-1,-1), 3, INDIGO),
        ("TOPPADDING",    (0,0),(-1,-1), 6),
        ("BOTTOMPADDING", (0,0),(-1,-1), 6),
        ("LEFTPADDING",   (0,0),(-1,-1), 10),
    ]))
    story.append(ask_t)
    build_doc(doc, story)
    return path


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════
GENERATORS = [
    gen_moscow,
    gen_rice,
    gen_impact_effort,
    gen_user_story,
    gen_jtbd,
    gen_vision_board,
    gen_roadmap,
    gen_prd,
    gen_okr,
    gen_stakeholder,
    gen_sprint,
    gen_retro,
    gen_gtm,
    gen_north_star,
    gen_aarrr,
    gen_ab_test,
    gen_decision_log,
    gen_feedback,
    gen_competitive,
    gen_interview,
]

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success, failed = [], []

    for gen_fn in GENERATORS:
        try:
            path = gen_fn()
            size = os.path.getsize(path)
            print(f"  ✅  {os.path.basename(path):45s}  {size:>7,} bytes")
            success.append(path)
        except Exception as e:
            print(f"  ❌  {gen_fn.__name__}: {e}")
            import traceback; traceback.print_exc()
            failed.append(gen_fn.__name__)

    print(f"\n{'─'*60}")
    print(f"  Generated : {len(success)} / {len(GENERATORS)}")
    if failed:
        print(f"  Failed    : {', '.join(failed)}")
    print(f"  Output dir: {OUTPUT_DIR}/")
